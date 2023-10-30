import { aiGenerate } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { defer } from "@defer/client";


async function dreamGenerateDefer(question: string) {
    console.log("defer dream() test");
    // const {question} = await request.json();
    // const user = await getUserByClerkID();
    console.log(question);
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

    console.log("runs before aiGen");
    const answer = await aiGenerate(question);
    console.log("answer test without answer");
    console.log("answer test", answer);

    return NextResponse.json({ data: answer });
}

export default defer(dreamGenerateDefer, { concurrency: 2, retry: 2 });

