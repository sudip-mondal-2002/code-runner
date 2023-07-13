import {Language, Solution, TestCase} from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import {PythonRunner} from "@/runners/PythonRunner";

export abstract class Runner {
  readonly abstract timeout: number
  readonly abstract language: Language

  abstract run(solution: Solution, testCase: TestCase): void
  abstract compile(solution: Solution): void

  abstract getRunnableFileName(solution: Solution): string

  getRawFileName(solution: Solution): string {
    return solution.id + "." + this.language.toLowerCase();
  }

  getOutputFileName(solution: Solution): string {
    return solution.id;
  }
  getStoreLocation(): string {
    return path.join(process.cwd(), this.language.toLowerCase())
  }


  dumpFile(solution: Solution): string {
    if(this.language !== solution.language) {
        throw new Error("Language mismatch");
    }
    const fileName = this.getRawFileName(solution);
    fs.writeFileSync(
      path.join(this.getStoreLocation(),fileName),
      solution.code);
    return fileName;
  }
  execute(solution: Solution, testCase: TestCase): string {
    this.dumpFile(solution);
    this.compile(solution);
    this.run(solution, testCase);
    return fs.readFileSync(
      this.getOutputFileName(solution)
    ).toString('utf-8');
  }


  static getRunner(language: Language): Runner{
    switch (language){
      case "PYTHON":
        return new PythonRunner()
      default:
        throw new Error("Runner not built")
    }
  }
}
