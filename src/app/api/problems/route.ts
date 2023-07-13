import {Problem} from "@prisma/client";
import {NextResponse} from "next/server";
import {ProblemController} from "@/controllers/Problem";

export async function GET(req: Request): Promise<NextResponse<Problem[]>> {
    const {searchParams} = new URL(req.url);
    const tags = searchParams.get("tags")?.split(",");
    const problemController = new ProblemController();
    return NextResponse.json(await problemController.getProblems({
        tags: tags || undefined
    }));
}
