import {RunnerError} from "@/errors/RunnerErrors/index";

export class TimeLimitExceededError extends RunnerError{
    toJSON(): { message: string; errorType: string } {
        return {errorType: "TLE", message: this.message};
    }

    constructor() {
        super("Time Limit Exceeded");
    }

}