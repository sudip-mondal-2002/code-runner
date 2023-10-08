import { NextResponse } from "next/server";
import { ProblemController } from "@/controllers/Problem";
import { Language, Solution, TestCase } from "@prisma/client";
import { RunnerFactory } from "@/runners/RunnerFactory";

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json();
  const language: Language = body.language as Language;
  const input: string = body.input as string;
  const code: string = body.code as string;
  const runner = RunnerFactory.getRunner(language);
  const result = await runner.execute(
    { code, language } as Solution,
    { input } as TestCase
  );
  return NextResponse.json(result);
}
