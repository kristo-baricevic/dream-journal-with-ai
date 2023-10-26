import { aiGenerate, qa } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    console.log("test from route");
    const question = "Write a dream journal entry. Make it up."
    console.log("this is a test", question);
    
    const user = await getUserByClerkID;

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

    const answer = await aiGenerate(question, entries);
    console.log("answer test without answer");

    console.log("answer test", answer);

    return NextResponse.json({ data: answer });
}