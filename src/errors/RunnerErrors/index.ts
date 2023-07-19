export type SerializedRunnerError = {
    message: string,
    errorType: string
}
export abstract class RunnerError extends Error{
    abstract code: string
    toJSON(): SerializedRunnerError{
        return {
            errorType: this.code,
            message: this.message
        }
    }
    protected constructor(message: string) {
        super(message);
    }
}