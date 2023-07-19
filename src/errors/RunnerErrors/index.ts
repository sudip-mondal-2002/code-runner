export type SerializedRunnerError = {
    message: string,
    errorType: string
}
export abstract class RunnerError extends Error{
    abstract toJSON(): SerializedRunnerError;
    protected constructor(message: string) {
        super(message);
    }
}