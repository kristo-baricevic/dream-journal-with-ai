// utils/getData.ts
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/prismaQuery';
import { AnalysisData } from '@/types';

export const getData = async (): Promise<{ analyses: AnalysisData[], avg: number }> => {
  const user = await getUserByClerkID();
  const analyses = await prisma.analysis.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'asc' },
  });

  const sum = analyses.reduce((total, current) => total + current.sentimentScore, 0);
  const avg = Math.round(sum / analyses.length);

  return {
    analyses, 
    avg,
  };
};
