'use client';

import { lightenColor } from "@/services/colorUtilities";
import { JournalEntry } from "@prisma/client";
import { useState } from "react";


const EntryCard = ({entry} ) => {
    const date = new Date(entry.createdAt).toDateString();
    const [analysis, setAnalysis] = useState(entry.analysis || {});

    const { summary, color, subject } = analysis;
    
    // const cloudStyle = {
    //     background: lightenColor(color, 20), 
    // };
    
    return (
        <div className="cloud bg-slate-300" 
        // style={cloudStyle} 
        >
            <div className="content">
                <div className="px-4 sm:px-6 z-10 font-serif">{date}</div>
                <div className="px-4 sm:p-6 content-truncate z-10 font-bold">{subject}</div>
                <div className="px-4 content-truncate sm:px-6 z-10 font-serif">{summary}</div>
            </div>             
        </div>
    )
}

export default EntryCard;

     