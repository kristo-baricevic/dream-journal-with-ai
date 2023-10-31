'use client';

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewEntryCard = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = async () => {
        setIsLoading(true);
        try {
            const data = await createNewEntry();
            router.replace(`/journal/${data.id}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="cloud cursor-pointer bg-white text-center">
            <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
                {isLoading ? (
                    <img src="/spinner.gif" alt="Loading..." />
                ) : (
                <span className="text-3xl">Click to Make a New Entry</span>
            )}
            </div>
        </div>
    )
}

export default NewEntryCard;