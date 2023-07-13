import {Runner} from "@/runners";
import {Solution, TestCase} from "@prisma/client";
import * as child_process from "child_process";
export class PythonRunner extends Runner {
  readonly timeout = 1000;
  readonly language = "PYTHON";

  compile(solution: Solution): void {
    return
  }

  getRunnableFileName(solution: Solution): string {
    return this.getRawFileName(solution);
  }

  run(solution: Solution, testCase: TestCase): void {
    child_process.execSync(
        `python3 ${this.getStoreLocation()}/${this.getRunnableFileName(solution)} < ${testCase.input} > ${this.getOutputFileName(solution)}`,
        {timeout: this.timeout}
    )
  }
}