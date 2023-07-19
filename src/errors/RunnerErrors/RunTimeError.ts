import {RunnerError} from "@/errors/RunnerErrors/index";

export class RunTimeError extends RunnerError{
    code = "RE"

    constructor(message?: string) {
        super(message || "Runtime Error Occurred");
    }

}