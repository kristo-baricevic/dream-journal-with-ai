'use client';

import { lightenColor } from "@/services/colorUtilities";
import { deleteEntry } from "@/utils/api";
import { JournalEntry } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";


const EntryCard = ({entry} ) => {
    const router = useRouter();


    const handleDelete = async () => {
        
        try {
            // Call delete with the entry ID to delete it
            const res = await deleteEntry(entry.id);
            console.log("delete response", res);
            router.push('/');
        } catch (error) {
            console.error("Failed to delete entry:", error);
        }
    };


    
    const date = new Date(entry.createdAt).toDateString();
    const [analysis, setAnalysis] = useState(entry.analysis || {});


    const hasAnalysisData = analysis && analysis.summary && analysis.color && analysis.subject;
    
    const cloudStyle = { background: lightenColor(analysis.color, 35) };
    
    return (
        <div className="cloud border border-style border-black" 
            style={cloudStyle}
        >
            <div className="ml-10 py-4">
                <div className="px-4 z-10 font-serif">{date}</div>
                <div className="px-4 content-truncate z-10 font-bold">
                    {analysis?.subject}
                    </div>
                <div className="px-4 content-truncate z-10 font-serif">{analysis?.summary}</div>
                    <button 
                        onClick={handleDelete}
                        type="submit" 
                        className="rounded-full text-sm ml-5 shadow-xl transition duration-300 ease-in-out hover:bg-white hover:text-white"
                    >
                    <div>
                        <img src="https://icons.iconarchive.com/icons/pictogrammers/material/128/trash-can-outline-icon.png" width="24" height="24" />
                    </div>
                </button>
            </div>             
        </div>
    )
}

export default EntryCard;

     