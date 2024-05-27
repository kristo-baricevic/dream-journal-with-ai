import { analyze } from "@/utils/analyze";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { EmotionType, emotions, getEmotionColor } from "@/utils/emotions";

const requestSchema = z.object({
  content: z.string().nonempty('Content is required'),
  personality: z.string().optional(),
  mood: z.enum(Object.keys(emotions) as [EmotionType, ...EmotionType[]]),
});

export const PATCH = async (request: NextRequest, { params }: any) => {
  try {
    const body = await request.json();
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors }, { status: 400 });
    }

    const { content, personality = "academic", mood } = validationResult.data; // Provide default value for personality
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

    // Fetch all entries for holistic analysis
    const allEntries = await prisma.journalEntry.findMany({
      where: { userId: user.id },
      select: { content: true },
    });

    const analysis = await analyze(allEntries, personality);

    const updated = await prisma.analysis.upsert({
      where: {
        entryId: updatedEntry.id,
      },
      create: {
        userId: user.id,
        entryId: updatedEntry.id,
        mood,
        color: getEmotionColor(mood),
        summary: analysis.summary,
        interpretation: analysis.interpretation,
        sentimentScore: analysis.sentimentScore,
        negative: analysis.negative,
        subject: analysis.subject,
      },
      update: {
        mood,
        color: getEmotionColor(mood),
        summary: analysis.summary,
        interpretation: analysis.interpretation,
        sentimentScore: analysis.sentimentScore,
        negative: analysis.negative,
        subject: analysis.subject,
      },
    });

    return NextResponse.json({ data: { ...updatedEntry, analysis: updated } });
  } catch (error) {
    console.error("Error analyzing entry:", error);
    return NextResponse.json({ error: 'Failed to analyze entry' }, { status: 500 });
  }
};
