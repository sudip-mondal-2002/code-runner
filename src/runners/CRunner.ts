import {Runner} from "@/runners/index";
import {Language, Solution} from "@prisma/client";
import * as child_process from "child_process";
import path from "path";

export class CRunner extends Runner{
    readonly language = Language.C;
    readonly timeout: number = 1000;

    protected compile(solution: Solution): void {
        child_process.execSync(`gcc ${path.join(this.getStoreLocation(solution), this.getRawFileName())} -o ${path.join(this.getStoreLocation(solution),this.getRunnableFileName(solution))}`)
    }

    protected getRunnableFileName(solution: Solution): string {
        return "run.exe";
    }

    protected getRunCommand(runFile: string) {
        return `${runFile}`
    }
}