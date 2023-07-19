import {RunnerError} from "@/errors/RunnerErrors/index";

export class RunTimeError extends RunnerError{
    toJSON() {
        return {errorType: "RE", message: this.message};
    }

    constructor(message?: string) {
        super(message || "Runtime Error Occurred");
    }

}