'use client';

import { createNewEntry, updatedEntry, generateDream } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import { deleteEntry } from "@/utils/api";





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

    const handleDelete = async (entry) => {
        try {
            // Call the onDelete function or method with the entry ID to delete it
            const res = await deleteEntry(entry.id);
            console.log("delete response", res);
            router.push('/');
        } catch (error) {
            console.error("Failed to delete entry:", error);
        }
    };

    return (
        <div className="px-4 py-4">
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
                    <div className="h-5/6">
                        <textarea 
                            className="w-full h-full px-4 py-4 text-xl resize-none border-solid border-2 border-black/60 rounded-lg shadow-md" 
                            value={value} 
                            onChange={(e) => setValue(e.target.value)} 
                        />
                    </div>
                </div>
                
                <div className="mt-20 max-h-5/6 overflow-scroll">
                    <div className="py-10 shadow-lg border-solid border-2 border-black/60 rounded-full" style={{backgroundColor: color}}>
                        <h2 className="text-lg text-center">Color Analysis</h2>
                    </div>
                    <div className="max-h-96">
                        <div className="mt-10 h-100 overflow-scroll">
                            <ul className="flex flex-col px-4 py-4 gap-4">
                                {analysisData.map((item) => (
                                    <li 
                                        key={item.name}
                                        className="flex flex-col items-center justify-between shadow-lg bg-slate-100 px-4 py-2 rounded-lg border-solid border-2 border-black/60"
                                    >
                                        <span className="flex text-lg font-semibold px-2 py-2">{item.name}</span>
                                        <span className="py-2 font-serif max-h-72 overflow-scroll">{item.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="mt-10"
                >
                <button 
                    onClick={handleDelete}
                    disabled={isLoading}
                    type="submit" 
                    className="bg-red-500 px-4 py-2 rounded-2xl text-lg ml-5 shadow-xl border-solid border-2 border-black transition duration-300 ease-in-out hover:bg-red-900 hover:text-white"
                    >
                        DELETE!
                </button>
            </div>
        </div>
    )
}

export default Editor;