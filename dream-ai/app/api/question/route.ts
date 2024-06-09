import { qa } from "@/utils/api/dreamApi";
import { getUserByClerkID } from "@/app/api/auth/getUserByClerkID";
import { prisma } from "@/services/prismaQuery";
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