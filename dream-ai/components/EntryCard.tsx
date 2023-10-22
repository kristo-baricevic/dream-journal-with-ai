'use client';

import { lightenColor } from "@/services/colorUtilities";
import { useState } from "react";


const EntryCard = ({entry}) => {
    const date = new Date(entry.createdAt).toDateString();
    const [analysis, setAnalysis] = useState(entry.analysis || {});

    const {mood, summary, color, subject, negative} = analysis;
    
    const cloudStyle = {
        background: lightenColor(color, 20), 
    };
    
    return (
        <div className="cloud" style={cloudStyle} >
            <div className="content">
                <div className="py-2 px-4 sm:px-6 z-10">{date}</div>
                <div className="px-4 sm:p-6 content-truncate z-10">{subject}</div>
            </div>             
        </div>
    )
}

export default EntryCard;

     