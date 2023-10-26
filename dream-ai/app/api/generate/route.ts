import { aiGenerate } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    console.log("test from route");
    const {question} = await request.json();
    const user = await getUserByClerkID;
    console.log(question);

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

    console.log("runs before aiGen");
    const answer = await aiGenerate(question, entries);
    console.log("answer test without answer");
    console.log("answer test", answer);

    return NextResponse.json({ data: answer });
}