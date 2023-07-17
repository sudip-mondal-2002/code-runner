import {PythonRunner} from "@/runners/PythonRunner";
import {Runner} from "@/runners/index";
import {Language} from "@prisma/client";

export class RunnerFactory {
    static getRunner(language: Language): Runner{
        switch (language){
            case "PYTHON":
                return new PythonRunner()
            default:
                throw new Error("Runner not built")
        }
    }
}