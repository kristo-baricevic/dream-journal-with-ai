import { analyze } from "@/utils/api/dreamApi";
import { getUserByClerkID } from "@/app/api/auth/getUserByClerkID"
import { prisma } from "@/services/prismaQuery";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const maxDuration = 120;
export const dynamic = 'force-dynamic';


export const POST = async () => {
    const user = await getUserByClerkID();
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your dream!'
        },
    })

    const { content } = entry;

    const personalityType = 'academic'
    const analysis = await analyze(content, personalityType);
    await prisma.analysis.create({
        data: {
            userId: user.id,
            entryId: entry.id,
            ...analysis,
        },
    })

    revalidatePath("/journal");

    return NextResponse.json({ data: entry })
}