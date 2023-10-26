import { qa } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const {question} = await request.json();
    const user = await getUserByClerkID;

    console.log("question", question);

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
        }
    });

    const answer = await qa(question, entries);

    console.log("answer is", answer);

    return NextResponse.json({ data: answer });
}