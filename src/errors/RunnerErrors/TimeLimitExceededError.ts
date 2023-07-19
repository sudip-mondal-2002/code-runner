import {RunnerError} from "@/errors/RunnerErrors/index";

export class TimeLimitExceededError extends RunnerError{
    code = "TLE"

    constructor() {
        super("Time Limit Exceeded");
    }

}