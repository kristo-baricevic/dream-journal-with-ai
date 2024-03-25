
'use client';

import NewEntryCard from "@/components/NewEntryCard";
import { JournalEntry } from "@prisma/client";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Question from "@/components/Question";
import DreamCatcher from "@/components/DreamCatcher";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DreamMainProps = {
    entries: JournalEntry[]; 
};

const DreamMain: React.FC<DreamMainProps> = ({ entries = [] }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = async () => {
        setIsLoading(true);
        try {
            const data = await createNewEntry();
            router.replace(`/journal/${data.id}`);
        } finally {
            setIsLoading(false)
        }
    }

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
                            ) : (<NewEntryCard />)
                        }
                    </div>
                </div>
            <div className="flex justify-center">
                <DreamCatcher entries={entries}/>
            </div>
        </>
    );
}

export default DreamMain;