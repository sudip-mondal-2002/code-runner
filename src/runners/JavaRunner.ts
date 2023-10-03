import {Runner} from "@/runners/index";
import {Language, Solution} from "@prisma/client";
import child_process from "child_process";
import path from "path";

export class JavaRunner extends Runner{
    readonly language = Language.JAVA;
    readonly timeout: number = 1000;

    protected compile(solution: Solution): void {
        child_process.execSync(`javac ${path.join(this.getStoreLocation(solution), this.getRawFileName())} -d ${this.getStoreLocation(solution)}`)
    }

    protected getRunnableFileName(solution: Solution): string {
        return "Main.class";
    }

    protected getRunCommand(runFile: string) {
        const dir = path.dirname(runFile)
        const fileName = path.basename(runFile)
        return `cd ${dir} && java ${fileName.split(".")[0]}`
    }
}