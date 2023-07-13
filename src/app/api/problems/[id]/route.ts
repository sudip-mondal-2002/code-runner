import {Problem} from "@prisma/client";
import {NextResponse} from "next/server";
import {ProblemController} from "@/controllers/Problem";

export const GET = async (_:Request, {params}: {
  params: { [key: string]: string }
}): Promise<NextResponse<Problem | null>> => {
  const problemController = new ProblemController();
  let problem
  try {
    problem = await problemController.getProblem(params.id);
  } catch (e) {
    return NextResponse.json(null)
  }
  if (!problem) {
    return NextResponse.json(null)
  }
  return NextResponse.json(problem)
}