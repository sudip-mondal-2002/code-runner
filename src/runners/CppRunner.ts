import {Runner} from "@/runners/index";
import {Solution} from "@prisma/client";
import * as child_process from "child_process";
import path from "path";

export class CppRunner extends Runner{
    readonly language = "CPP";
    readonly timeout: number = 1000;

    protected compile(solution: Solution): void {
        child_process.execSync(`g++ ${path.join(this.getStoreLocation(solution), this.getRawFileName(solution))} -o ${path.join(this.getStoreLocation(solution),this.getRunnableFileName(solution))}`)
    }

    protected getRunnableFileName(solution: Solution): string {
        return "run.exe";
    }

    protected getRunCommand(runFile: string, input: string, output: string) {
        return `${runFile} < ${input} > ${output}`
    }
}