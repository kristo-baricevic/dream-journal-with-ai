'use client';

import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import DreamCatcher from "@/components/DreamCatcher";
import { createNewEntry, deleteEntry } from "@/utils/api/clientApi";
import { getEntries } from "@/utils/api/getEntries";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { JournalEntry } from "@prisma/client";

type DreamMainProps = {
    initialEntries: JournalEntry[];
};

const DreamMain: React.FC<DreamMainProps> = ({ initialEntries = [] }) => {
    const router = useRouter();
    const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setEntries(initialEntries);
    }, [initialEntries]);

    const handleOnClick = async () => {
        setIsLoading(true);

        try {
            const data = await createNewEntry();

            //fetch entries after creating new entry to avoid hydration errors
            const updatedEntries = await getEntries();
            setEntries(updatedEntries);
            router.replace(`/journal/${data.id}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteEntry = async (id: string) => {
        try {
            console.error("delete entry:", id);
            await deleteEntry(id);
            const updatedEntries = entries.filter((entry) => entry.id !== id);
            setEntries(updatedEntries);
        } catch (error) {
            console.error("Failed to delete entry:", error);
        }
    };

    return (
        <>
            <div className="mb-4">
                <Question />
            </div>
            <div className="flex justify-center" onClick={handleOnClick}>
                <div>
                    {isLoading ? (
                        <div className="spinner-overlay">
                            <Image 
                                src="/spinner.gif" 
                                alt="Loading..." 
                                height="100"
                                width="100"
                            />
                        </div>
                    ) : (
                        <NewEntryCard />
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                <DreamCatcher entries={entries} onDeleteEntry={handleDeleteEntry} />
            </div>
        </>
    );
};

export default DreamMain;
