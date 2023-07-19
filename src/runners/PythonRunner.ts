import {Runner} from "@/runners";
import {Solution, TestCase} from "@prisma/client";
import * as child_process from "child_process";

export class PythonRunner extends Runner {
    readonly timeout = 10000;
    readonly language = "PYTHON";

    compile(solution: Solution): void {
        return;
    }

    getRunnableFileName(solution: Solution): string {
        return this.getRawFileName();
    }

    protected getRunCommand(runFile: string) {
        return `python3 ${runFile}`
    }
}
