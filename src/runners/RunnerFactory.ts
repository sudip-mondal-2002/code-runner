import {PythonRunner} from "@/runners/PythonRunner";
import {Runner} from "@/runners/index";
import {Language} from "@prisma/client";
import {CppRunner} from "@/runners/CppRunner";
import {CRunner} from "@/runners/CRunner";
import {JavaRunner} from "@/runners/JavaRunner";

export class RunnerFactory {
    static getRunner(language: Language): Runner{
        switch (language){
            case Language.PYTHON:
                return new PythonRunner()
            case Language.CPP:
                return new CppRunner()
            case Language.C:
                return new CRunner()
            case Language.JAVA:
                return new JavaRunner()
            default:
                throw new Error("Runner not built")
        }
    }
}