import {PythonRunner} from "@/runners/PythonRunner";
import {Runner} from "@/runners/index";
import {Language} from "@prisma/client";
import {CppRunner} from "@/runners/CppRunner";

export class RunnerFactory {
    static getRunner(language: Language): Runner{
        switch (language){
            case Language.PYTHON:
                return new PythonRunner()
            case Language.CPP:
                return new CppRunner()
            default:
                throw new Error("Runner not built")
        }
    }
}