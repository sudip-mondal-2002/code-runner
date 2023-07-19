import {RunnerError} from "@/errors/RunnerErrors/index";

export class CompileError extends RunnerError{
    code = "CE"
    constructor() {
        super("Compilation Error");
    }
}