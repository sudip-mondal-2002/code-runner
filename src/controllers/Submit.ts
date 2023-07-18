import {Language, PrismaClient, Solution, TestCase} from "@prisma/client";
import {RunnerFactory} from "@/runners/RunnerFactory";
import {prismaClient} from "@/repository/prisma";

export class SubmitController {
    readonly prisma: PrismaClient = prismaClient
    checkOutput(actualOutput: string, expectedOutput: string): boolean {
        return actualOutput.trim().split("\n").reduce((acc, currentValue, currentIndex) => {
            if(currentIndex >= expectedOutput.trim().split("\n").length) {
                return false
            }
            const expected = expectedOutput.trim().split("\n")[currentIndex];
            const actualTokens = currentValue.trim().split(" ").filter(token => token.trim() !== "");
            const expectedTokens = expected.trim().split(" ").filter(token => token.trim() !== "");
            if(actualTokens.length !== expectedTokens.length) {
                return false;
            }
            return actualTokens.reduce((_acc, token, index) => {
                return _acc && token === expectedTokens[index];
            }, acc)
        }, true)
    }
    async submitSolution(code: string, language: Language, problemId: string): Promise<Solution> {
        const runner = RunnerFactory.getRunner(language);
        const solution = await this.prisma.solution.create({
            data: {
                code: code,
                problemId: problemId,
                language: language,
            },
            include:{
                problem: {
                    include: {
                        testcases: true
                    }
                },
                outputs: true
            }
        })
        for (const testCase of await solution.problem["testcases"]) {
            const {output, runtime, error} = await runner.execute(solution as Solution, testCase);
            const isCorrect =!error && this.checkOutput(output, testCase.output);
            const result = await this.prisma.output.create({
                data: {
                    solutionId: solution["id"],
                    testcaseId: testCase.id,
                    passed: isCorrect,
                    runtime: runtime
                }
            })
            solution.outputs["push"](result);
            if(!isCorrect) {
                break;
            }
        }
        runner.deleteSolution(solution as Solution)
        return solution;
    }
}