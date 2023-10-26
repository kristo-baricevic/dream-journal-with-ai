'use client';

import { lightenColor } from "@/services/colorUtilities";
import { deleteEntry } from "@/utils/api";
import { JournalEntry } from "@prisma/client";
import { useState } from "react";


const EntryCard = ({entry} ) => {
    const date = new Date(entry.createdAt).toDateString();
    const [analysis, setAnalysis] = useState(entry.analysis || {});
    const [isDeleted, setIsDeleted] = useState(false);


    const { summary, color, subject } = analysis;

    console.log(color);
    
    const cloudStyle = {
        background: lightenColor(color, 35), 
    };
    
    const handleDelete = async () => {
        // Call the onDelete function or method with the entry ID to delete it
        await deleteEntry(entry.id);
        setIsDeleted(true);
    };

    return (
        <div className="cloud" 
        style={cloudStyle} 
        >
            <div className="ml-10 py-4">
                <div className="px-4 z-10 font-serif">{date}</div>
                <div className="px-4 content-truncate z-10 font-bold">{subject}</div>
                <div className="px-4 content-truncate z-10 font-serif">{summary}</div>
                <button onClick={handleDelete}>Delete</button>
            </div>             
        </div>
    )
}

export default EntryCard;

     