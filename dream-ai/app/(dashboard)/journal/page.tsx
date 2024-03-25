import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import DreamMain from "@/components/DreamMain";
import LyricIterator from "@/components/LyricIterator";

const getEntries = async () => {
    const user = await getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            analysis: true,
      },
    })

    return entries;
}

const JournalPage = async () => {
    const entries = await getEntries();


    return (
        <div className="px-10">
            <div className="flex justify-center p-2">
                <h3 className="mb-4 font-serif fade-in">
                    <LyricIterator />
                </h3>
            </div>
           <div>
                <DreamMain entries={entries} />
           </div>
        </div>
    );
}

export default JournalPage;