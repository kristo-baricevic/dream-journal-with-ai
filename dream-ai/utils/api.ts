import { getUserByClerkID } from "./auth";
import { prisma } from "./db";

export const getEntries = async () => {
    const user = await getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: { analysis: true },
    });
    return entries;
}