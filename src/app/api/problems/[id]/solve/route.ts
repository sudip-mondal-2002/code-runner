import {Problem, Solution} from "@prisma/client";
import {NextResponse} from "next/server";
import {SubmitController} from "@/controllers/Submit";

export const POST = async (req:Request, {params}: {
  params: { [key: string]: string }
}): Promise<NextResponse<Solution | null>> => {
    const submitController = new SubmitController();
    const problemId = params["id"];
    const {code, language} = await req.json();
    return NextResponse.json(await submitController.submitSolution(code, language, problemId));
}