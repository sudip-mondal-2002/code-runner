import {Runner} from "@/runners";
import {Solution, TestCase} from "@prisma/client";
import * as child_process from "child_process";

export class PythonRunner extends Runner {
    readonly timeout = 10000;
    readonly language = "PYTHON";

    compile(solution: Solution): void {
        return
    }

    getRunnableFileName(solution: Solution): string {
        return this.getRawFileName(solution);
    }

    run(solution: Solution, testCase: TestCase): Promise<void> {
        const runFile = `${this.getStoreLocation(solution)}/${this.getRunnableFileName(solution)}`
        const input = `${this.getStoreLocation(solution)}/${this.getInputFileName()}`
        const output = `${this.getStoreLocation(solution)}/${this.getOutputFileName()}`
        const child = child_process.spawn(
            `python3 ${runFile} < ${input} > ${output}`,
            {shell: true}
        )
        return new Promise((resolve, reject) => {
            let hasExited = false;
            const timeOut = setTimeout(()=>{
                console.log("Killing child process")
                if(!hasExited){
                    child.kill()
                    reject()
                }
            }, this.timeout)
            child.on("exit", ()=>{
                hasExited = true
                clearTimeout(timeOut)
                resolve()
            })
            child.on('error', (error) => {
                console.log(error)
                hasExited = true;
                clearTimeout(timeOut);
                reject(error);
            })
        })
    }
}