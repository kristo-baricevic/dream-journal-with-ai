'use client';

import { lightenColor } from "@/services/colorUtilities";
import { JournalEntry } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

type EntryCardProps = {
    entry: JournalEntry;
    href: string;
    onDelete: (id: string) => void;
};


const EntryCard = ({entry, href, onDelete}: any ) => {
    const handleDelete = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onDelete(entry.id);
    };

    const date = new Date(entry.createdAt).toDateString();
    const [analysis, setAnalysis] = useState(entry.analysis || {});

    const hasAnalysisData = analysis && analysis.summary && analysis.color && analysis.subject;
    
    const cloudStyle = { background: lightenColor(analysis.color, 13) };
    
    return (
        <Link href="/journal/[id]" as={href}>
            <div className="cloud border border-style border-black" 
                style={cloudStyle}
            >
                <div className="ml-10 flex flex-col">
                    <div className="px-4 font-serif">{date}</div>
                    <div className="px-4 content-truncate font-bold">
                        {analysis?.subject}
                    </div>
                    <div className="px-4 content-truncate font-serif">{analysis?.summary}</div>
                        <button 
                            onClick={handleDelete}
                            type="submit" 
                            className="px-4"
                        >
                            <div>
                                <img src="https://icons.iconarchive.com/icons/pictogrammers/material/128/trash-can-outline-icon.png" width="24" height="24" />
                            </div>
                        </button>
                </div>             
            </div>
        </Link>

    )
}

export default EntryCard;

     