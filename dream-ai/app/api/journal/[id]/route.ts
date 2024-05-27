import { analyze } from "@/utils/analyze";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  content: z.string().nonempty('Content is required'),
});

export const PATCH = async (request: NextRequest, { params }: any) => {
  try {
    const body = await request.json();
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors }, { status: 400 });
    }

    const { content } = validationResult.data;
    const user = await getUserByClerkID();

    const updatedEntry = await prisma.journalEntry.update({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id,
        },
      },
      data: {
        content,
      },
    });

    const analysis = await analyze(updatedEntry.content);

    const updated = await prisma.analysis.upsert({
      where: {
        entryId: updatedEntry.id,
      },
      create: {
        userId: user.id,
        entryId: updatedEntry.id,
        ...analysis,
      },
      update: analysis,
    });

    return NextResponse.json({ data: { ...updatedEntry, analysis: updated } });
  } catch (error) {
    console.error("Error analyzing entry:", error);
    return NextResponse.json({ error: 'Failed to analyze entry' }, { status: 500 });
  }
};
