import { getUserByClerkID } from "../app/api/auth/getUserByClerkID";
import { prisma } from "../services/prismaQuery";

export const getEntry = async (id: string) => {
  const user = await getUserByClerkID({ id: true });
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};
