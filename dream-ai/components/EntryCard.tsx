'use client';

import { lightenColor } from "@/services/colorUtilities";
import { JournalEntry } from "@prisma/client";
import { useState } from "react";


const EntryCard = ({entry} ) => {
    
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
            </div>             
        </div>
    )
}

export default EntryCard;

     