import {PrismaClient, Problem} from "@prisma/client";

export class ProblemController {
    readonly prisma: PrismaClient = new PrismaClient();

    async getTags(): Promise<string[]> {
        return this.prisma.problem.findMany({
            select: {
                tags: true
            }
        }).then(problems => {
            return problems.map(problem => problem.tags)
                .flat()
                .filter((tag, index, self) => {
                    return self.indexOf(tag) === index;
                });
        })
    }

    async getProblems(filters: { tags?: string[] }): Promise<Problem[]> {
        if (!filters.tags) {
            return this.prisma.problem.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    difficulty: true,
                    _count: {
                        select: {
                            solutions: {
                                where: {
                                    outputs: {
                                        none: {
                                            passed: false
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
        return this.prisma.problem.findMany({
            where: {
                tags: {
                    hasSome: filters.tags
                }
            }
        })
    }

    async getProblem(id: string): Promise<Problem | null> {
        return this.prisma.problem.findUnique({
            where: {
                id: id
            },
            include: {
                testcases: {
                    where: {
                        example: true
                    }
                }
            }
        });
    }
}