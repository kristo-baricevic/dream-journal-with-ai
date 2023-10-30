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
            <h3 className="text-3xl mb-4 font-seri fade-in">
                It's Your Dreams That Make You Feel Free, Dream Baby Dream
            </h3>
            <div className="mb-4">
                <Question />
            </div>
            <div className="mt-20 flex justify-center">
                <NewEntryCard />
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {entries.map((entry) => (
                        <Link href={`/journal/${entry.id}`} key={entry.id}>
                            <div>
                                <EntryCard key={entry.id} entry={entry} href={`/journal/${entry.id}`} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default JournalPage;