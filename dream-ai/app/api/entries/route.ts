// app/api/entries/route.ts
import { prisma } from "@/services/prismaQuery";
import { NextResponse } from "next/server";
import { analyze } from "@/utils/api/dreamApi";
import { revalidatePath } from "next/cache";
import { getUserByClerkID } from "@/app/api/auth/getUserByClerkID"

export const GET = async () => {
    try {
        const user = await getUserByClerkID();
        console.log("User:", user);
  
    const entries = await prisma.journalEntry.findMany({
        where: { userId: user?.id },
        orderBy: { createdAt: "desc" },
        include: { analysis: true },
    });
  
        return NextResponse.json(entries);
    } catch (error) {
        console.error("Error in GET /api/entries:", error);
        return NextResponse.json({ error: "Failed to retrieve entries" }, { status: 500 });
    }
};

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export const POST = async () => {
    const user = await getUserByClerkID();

    if (!user) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your dream!'
        },
    });

    const { content } = entry;

    const personalityType = 'academic';
    const analysis = await analyze(content, personalityType);
    await prisma.analysis.create({
        data: {
        userId: user.id,
        entryId: entry.id,
        ...analysis,
        },
    });

    revalidatePath("/journal");

    return NextResponse.json({ data: entry });
};