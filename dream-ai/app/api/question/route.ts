import { qa } from "@/utils/question";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { JournalEntry } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 120;
export const dynamic = 'force-dynamic';


export const POST = async (request: NextRequest) => {
    const {question} = await request.json();
    const user = await getUserByClerkID();

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

    return NextResponse.json({ data: answer });
}