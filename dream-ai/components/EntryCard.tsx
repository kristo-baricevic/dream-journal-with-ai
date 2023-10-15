'use client';

import { useState } from "react";

const EntryCard = ({entry}) => {
    const date = new Date(entry.createdAt).toDateString();
    const [analysis, setAnalysis] = useState(entry.analysis || {});

    const {mood, summary, color, subject, negative} = analysis;
    console.log(entry);

    
    return (
        <div className="divide-y divide-gray-200 overflow-hidden bg-white shadow">
            <div className="px-4 py-5 sm:px-6">{date}</div>
            <div className="px-4 py-5 sm:p-6 content-truncate">{entry.content}</div>
        </div>
    )
}

export default EntryCard;