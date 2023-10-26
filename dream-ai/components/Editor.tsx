'use client';

import { createNewEntry, updatedEntry, generateDream } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAutosave } from "react-autosave";




const Editor = ({ entry }) => {
    const router = useRouter();

    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(entry.analysis);

    const {mood, summary, color, interpretation, subject, negative} = analysis;
    const analysisData = [
        {name: 'Summary', value: summary},
        {name: 'Subject', value: subject},
        {name: 'Mood', value: mood}, 
        {name: 'Analysis', value: interpretation}, 
        {name: 'Negative', value: negative ? 'True' : 'False'},
    ]
    
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true);
            const data = await updatedEntry(entry.id, _value);
            setAnalysis(data.analysis);
            setIsLoading(false);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await generateDream();
        setValue(res);
        setIsLoading(false);
      };

    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2 px-4">
                <div className="py-4">
                    <form onSubmit={handleSubmit}>
                        <button 
                            disabled={isLoading}
                            type="submit" 
                            className="bg-pink-400 px-4 py-2 rounded-2xl text-lg ml-5 shadow-xl border-solid border-2 border-black transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white"
                            >
                                Generate a Dream!
                        </button>
                    </form>      
                </div>
                {isLoading && <div>...loading</div>}
                <textarea 
                    className="w-full h-full p-d text-xl outline-none" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                />
            </div>
            
            <div className="">
                <div className="px-6 py-10 rounded-xl shadow-lg" style={{backgroundColor: color}}>
                    <h2 className="text-xl text-center">Color Analysis</h2>
                </div>
                <div>
                    <ul className="flex flex-col px-4 py-4 gap-4">
                        {analysisData.map((item) => (
                            <li 
                                key={item.name}
                                className="flex flex-col items-center justify-between shadow-lg bg-slate-100 px-4 py-2 rounded-lg"
                            >
                                <span className="flex text-lg font-semibold px-2 py-2">{item.name}</span>
                                <span className="py-2 font-serif">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor;