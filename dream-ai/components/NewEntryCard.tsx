'use client';

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";


const NewEntryCard = () => {
    const router = useRouter();

    const handleOnClick = async () => {
        const data = await createNewEntry();
        router.replace(`/journal/${data.id}`);
    }

    return (
        <div className="cloud cursor-pointer bg-white text-center">
            <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
                <span className="text-3xl">Click to Make a New Entry</span>
            </div>
        </div>
    )
}

export default NewEntryCard;