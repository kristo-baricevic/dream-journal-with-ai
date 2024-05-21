'use client';

import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import DreamCatcher from "@/components/DreamCatcher";
import { createNewEntry, getEntries, deleteEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
            const updatedEntries = await getEntries();
            setEntries(updatedEntries);
            router.replace(`/journal/${data.id}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteEntry = async (id: string) => {
        try {
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
                            <img src="/spinner.gif" alt="Loading..." />
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
