// utils/getEntries.js

import { prisma } from "./db";

export const getEntries = async (userId: string) => {
  try {
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        analysis: true,
      },
    });

    return entries;
  } catch (error) {
    console.error('Error fetching entries: ', error);
    return [];
  }
};
