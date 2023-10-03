import {Language, Solution, TestCase} from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import child_process, {ChildProcessWithoutNullStreams} from "child_process";
import {TimeLimitExceededError} from "@/errors/RunnerErrors/TimeLimitExceededError";
import {RunTimeError} from "@/errors/RunnerErrors/RunTimeError";
import {RunnerError, SerializedRunnerError} from "@/errors/RunnerErrors";
import {CompileError} from "@/errors/RunnerErrors/CompileError";

export abstract class Runner {
    readonly abstract timeout: number
    readonly abstract language: Language

    protected abstract getRunCommand(runFile: string): string

    async run(solution: Solution, testCase: TestCase): Promise<string> {
        const runFile = `${this.getStoreLocation(solution)}/${this.getRunnableFileName(solution)}`;
        const child = child_process.spawn(this.getRunCommand(runFile), [], {
            shell: true
        });

        child.stdin.setDefaultEncoding('utf-8')
        child.stdin.write(testCase.input + "\n")


        return this.waitForRunCompletion(child, () => {
            this.deleteSolution(solution)
        })
    }

    protected abstract compile(solution: Solution): void

    protected abstract getRunnableFileName(solution: Solution): string

    getRawFileName(): string {
        return "Main." + this.language.toLowerCase();
    }

    getStoreLocation(solution: Solution): string {
        return path.join(process.cwd(), "tmp", this.language.toLowerCase(), solution.id);
    }

    deleteSolution(solution: Solution): void {
        return
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
        const fileName = this.getRawFileName();
        fs.writeFileSync(
            path.join(this.getStoreLocation(solution), fileName),
            solution.code);
        return fileName;
    }

    async waitForRunCompletion(child: ChildProcessWithoutNullStreams, onClose: ()=>void): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let hasExited = false;
            let isTLE = false;
            const timeout = setTimeout(() => {
                isTLE = true
                if (!hasExited) {
                    child.kill("SIGKILL")
                }
            }, this.timeout);

            child.on("exit", async (code) => {
                hasExited = true;
                clearTimeout(timeout);
                if (!isTLE && code === 0) {
                    const outputValue = child.stdout.read()?.toString('utf-8') || ""
                    resolve(outputValue);
                } else if (isTLE) {
                    reject(new TimeLimitExceededError());
                } else {
                    reject(new RunTimeError(child.stderr.read()?.toString('utf-8') || undefined));
                }
                child.on("close", onClose)
            });

            child.on("error", (error) => {
                hasExited = true;
                clearTimeout(timeout);
                reject(new RunTimeError(error.message));
            });
        });
    }

    async execute(solution: Solution, testCase: TestCase): Promise<{
        output: string,
        runtime: number,
        error?: SerializedRunnerError
    }> {
        this.dumpFile(solution);
        let error: RunnerError | null = null
        let output = ""
        try {
            this.compile(solution);
        } catch (e){
            error = new CompileError()
        }
        if (error){
            return {
                output,
                runtime: 0,
                error: error.toJSON()
            }
        }
        const startTime = process.hrtime()

        try {
            output = await this.run(solution, testCase)
        } catch (e) {
            error = e as RunnerError
        }
        const endTime = process.hrtime();

        const runtime = Math.floor((endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1000000);
        return {
            output,
            runtime,
            error: error?.toJSON()
        };
    }
}
