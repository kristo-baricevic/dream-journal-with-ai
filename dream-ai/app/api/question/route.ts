import { qa } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const POST = async (request: NextApiRequest) => {
    const {question} = await request.body.json();
    const user = await getUserByClerkID();

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
            content: true,
        }
    });

    const answer = await qa(question, entries);

    return NextResponse.json({ data: answer });
}