import { qa } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { defer } from "@defer/client";
import { JournalEntry } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


async function askQuestion(request: NextRequest){
    const {question} = await request.json();
    const user = await getUserByClerkID();

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

    console.log("entries should have been received");

    const answer = await qa(question, entries);

    return NextResponse.json({ data: answer });
}

export default defer(askQuestion, { concurrency: 2, retry: 2 });
