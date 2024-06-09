import { aiGenerate } from "@/utils/api/dreamApi";
import { getUserByClerkID } from "@/app/api/auth/getUserByClerkID";
import { prisma } from "@/services/prismaQuery";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  question: z.string().min(1, 'Question is required'),
});

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors }, { status: 400 });
    }

    const { question } = validationResult.data;
    const user = await getUserByClerkID();

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    const answer = await aiGenerate(question);

    return NextResponse.json({ data: answer });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
};
