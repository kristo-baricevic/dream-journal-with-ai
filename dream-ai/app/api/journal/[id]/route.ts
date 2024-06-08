import { analyze } from '@/utils/api/dreamApi';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/services/prismaQuery';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getEmotionColor, emotions, EmotionType } from "@/utils/paramters/emotions"

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  personality: z.string().optional(),
  mood: z.enum(Object.keys(emotions) as [EmotionType, ...EmotionType[]]),
});

export const PATCH = async (request: NextRequest, { params }: any) => {
  const user = await getUserByClerkID();
  const body = await request.json();
  const validationResult = requestSchema.safeParse(body);
  if (!validationResult.success) {
    console.error('Validation Errors:', validationResult.error.errors);
    return NextResponse.json({ error: validationResult.error.errors }, { status: 400 });
  }

  const { content, personality = 'academic', mood } = validationResult.data;

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

  const analysis = await analyze(updatedEntry.content, personality);

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
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const user = await getUserByClerkID();
  const entryId = params.id;

  const entry = await prisma.journalEntry.findFirst({
    where: {
      id: entryId,
      userId: user.id,
    },
  });

  if (!entry) {
    return NextResponse.json({ error: 'Entry not found or not authorized' }, { status: 404 });
  }

  // Delete the entry
  await prisma.journalEntry.delete({
    where: {
      id: entryId,
    },
  });

  return NextResponse.json({ message: 'Entry deleted successfully' });
};
