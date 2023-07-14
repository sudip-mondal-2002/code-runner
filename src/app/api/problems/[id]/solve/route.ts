import {Problem} from "@prisma/client";
import {NextResponse} from "next/server";
import {ProblemController} from "@/controllers/Problem";

export const POST = async (_:Request, {params}: {
  params: { [key: string]: string }
}): Promise<NextResponse<Problem | null>> => {
  return NextResponse.json(null)
}