import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";
import { analyze } from "@/utils/ai";
import Question from "@/components/Question";


const getEntries = async () => {
    const user = await getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return entries;
}

const JournalPage = async () => {
    const entries = await getEntries();

    return (
        <div className="p-4">
          <h2 className="text-3xl mb-4">Journal</h2>
          <div className="mb-4">
            <Question />
          </div>
          <NewEntryCard />
          <div className="flex justify-center mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                    {entries.map((entry) => (
                    <Link href={`/journal/${entry.id}`} key={entry.id}>
                        <div>
                            <EntryCard key={entry.id} entry={entry} />
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
      );
}

export default JournalPage;