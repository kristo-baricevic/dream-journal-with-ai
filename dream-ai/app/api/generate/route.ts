import { aiGenerate } from "@/defer/generate";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export const POST = async (request: NextRequest) => {
    
    console.log("test from route");
    const {question} = await request.json();
    const user = await getUserByClerkID();
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
    const answer = await aiGenerate(question);
    console.log("answer test without answer");
    console.log("answer test", answer);

    return NextResponse.json({ data: answer });
}