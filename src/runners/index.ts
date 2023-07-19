import {Language, Solution, TestCase} from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import {ChildProcessWithoutNullStreams} from "child_process";
import child_process from "child_process";

export abstract class Runner {
    readonly abstract timeout: number
    readonly abstract language: Language
    protected abstract getRunCommand(runFile: string, input: string, output: string)

    async run(solution: Solution): Promise<string>{
        const runFile = `${this.getStoreLocation(solution)}/${this.getRunnableFileName(solution)}`;
        const input = `${this.getStoreLocation(solution)}/${this.getInputFileName()}`;
        const output = `${this.getStoreLocation(solution)}/${this.getOutputFileName()}`;

        const child = child_process.spawn(this.getRunCommand(runFile, input, output), [], {shell: true});
        return this.waitForRunCompletion(child, output, ()=>{
            this.deleteSolution(solution)
        })
    }

    protected abstract compile(solution: Solution): void

    protected abstract getRunnableFileName(solution: Solution): string

    getRawFileName(solution: Solution): string {
        return "Main." + this.language.toLowerCase();
    }

    getInputFileName(): string {
        return "input.txt";
    }

    getOutputFileName(): string {
        return "output.txt";
    }

    getStoreLocation(solution: Solution): string {
        return path.join(process.cwd(), "tmp", this.language.toLowerCase(), solution.id);
    }

    deleteSolution(solution: Solution): void {
        if (fs.existsSync(this.getStoreLocation(solution))) {
            fs.rmSync(this.getStoreLocation(solution), {recursive: true});
        }
    }


    dumpFile(solution: Solution): string {
        if (this.language !== solution.language) {
            throw new Error("Language mismatch");
        }
        if (!fs.existsSync(this.getStoreLocation(solution))) {
            fs.mkdirSync(this.getStoreLocation(solution), {recursive: true});
        }
        const fileName = this.getRawFileName(solution);
        fs.writeFileSync(
            path.join(this.getStoreLocation(solution), fileName),
            solution.code);
        return fileName;
    }

    dumpIO(solution: Solution, testCase: TestCase): void {
        if (!fs.existsSync(this.getStoreLocation(solution))) {
            fs.mkdirSync(this.getStoreLocation(solution), {recursive: true});
        }
        const input = path.join(this.getStoreLocation(solution), this.getInputFileName());
        const output = path.join(this.getStoreLocation(solution), this.getOutputFileName());
        fs.writeFileSync(input, testCase.input);
        fs.writeFileSync(output, "\n");
    }

    async waitForRunCompletion(child: ChildProcessWithoutNullStreams,outputLocation, onClose): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let hasExited = false;
            const timeout = setTimeout(() => {
                if (!hasExited) {
                    child.kill("SIGKILL")
                }
            }, this.timeout);

            child.on("exit", async (code, signal) => {
                hasExited = true;
                clearTimeout(timeout);
                if (signal !== "SIGKILL") {
                    const outputValue = fs.readFileSync(outputLocation).toString('utf-8')
                    resolve(outputValue);
                } else {
                    reject(new Error(`Process exited with code ${code}, signal ${signal}`));
                }
                child.on("close", onClose)
            });

            child.on("error", (error) => {
                hasExited = true;
                clearTimeout(timeout);
                reject(error);
            });
        });
    }

    async execute(solution: Solution, testCase: TestCase): Promise<{
        output: string,
        runtime: number,
        error: boolean
    }> {
        this.dumpFile(solution);
        this.dumpIO(solution, testCase);
        this.compile(solution);
        const startTime = process.hrtime()
        let error = false
        let output = ""
        try {
            output = await this.run(solution)
        } catch (e) {
            error = true
        }
        const endTime = process.hrtime();

        const runtime = Math.floor((endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1000000);

        return {
            output,
            runtime,
            error
        };
    }
}
