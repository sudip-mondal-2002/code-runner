import {Language, Solution, TestCase} from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import {PythonRunner} from "@/runners/PythonRunner";
export abstract class Runner {
  readonly abstract timeout: number
  readonly abstract language: Language

  protected abstract run(solution: Solution, testCase: TestCase): Promise<void>
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
    return path.join(process.cwd(), this.language.toLowerCase(), solution.id);
  }


  dumpFile(solution: Solution): string {
    if(this.language !== solution.language) {
        throw new Error("Language mismatch");
    }
    if(!fs.existsSync(this.getStoreLocation(solution))) {
        fs.mkdirSync(this.getStoreLocation(solution), {recursive: true});
    }
    const fileName = this.getRawFileName(solution);
    fs.writeFileSync(
      path.join(this.getStoreLocation(solution),fileName),
      solution.code);
    return fileName;
  }

  dumpIO(solution: Solution, testCase: TestCase): void {
    if(!fs.existsSync(this.getStoreLocation(solution))) {
      fs.mkdirSync(this.getStoreLocation(solution), {recursive: true});
    }
    const input = path.join(this.getStoreLocation(solution), this.getInputFileName());
    const output = path.join(this.getStoreLocation(solution), this.getOutputFileName());
    fs.writeFileSync(input, testCase.input);
    fs.writeFileSync(output, "\n");
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
    try{
      await this.run(solution, testCase);
    } catch (e){
      error = true
    }
    const endTime = process.hrtime();

    const runtime = Math.floor((endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1000000);
    return {
      output: fs.readFileSync(path.join(this.getStoreLocation(solution), this.getOutputFileName())).toString('utf-8'),
      runtime,
      error
    };
  }
}
