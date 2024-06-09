import { getUserByClerkID } from "@/app/api/auth/getUserByClerkID";
import { prisma } from "./prismaQuery";

export const getEntries = async () => {
    const user = await getUserByClerkID();
    console.log("user is " + user.id);
    const entries = await prisma.journalEntry.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: { analysis: true },
    });
    console.log("Entries:", entries);
    return entries;
}