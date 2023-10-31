'use client';

import { createNewEntry, updatedEntry, generateDream } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useAutosave } from "react-autosave";
import { deleteEntry } from "@/utils/api";





const Editor = ({ entry }) => {
    const router = useRouter();

    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(entry.analysis);
    const [isAnalysisPerformed, setIsAnalysisPerformed] = useState(!!entry.analysis);


    const {mood, summary, color, interpretation, subject, negative} = analysis;
    const analysisData = [
        {name: 'Summary', value: summary},
        {name: 'Subject', value: subject},
        {name: 'Mood', value: mood}, 
        {name: 'Negative', value: negative ? 'True' : 'False'},
        {name: 'Analysis', value: interpretation}, 
    ]
    
    // useAutosave({
    //     data: value,
    //     onSave: async (_value) => {
    //         setIsLoading(true);
    //         const data = await updatedEntry(entry.id, _value);
    //         setAnalysis(data.analysis);
    //         setIsLoading(false);
    //     },
    // });

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const data = await updatedEntry(entry.id, value);
            setAnalysis(data.analysis);
        } catch (error) {
            console.error("Failed to save entry:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);
        const prompt = "Please make up a dream of any kind. Generate a number between 1 and 5. If the number is 1, the dream should be happy and imaginative. If the number is 2, the dream should be sad and creepy. If the number is 3, the dream should be weird and abstract. If the number is 4, the dream should be about love and passion. If the number is 5, the dream should be about deepest fears. It can be a happy dream or a sad dream, or a fantastical dream. Use modern references!";

        try {
            const res = await generateDream(prompt);
            console.log("inside the try catch");
            setValue(res);
        } catch (error) {
            console.error("Failed to generate dream:", error);
            setValue("There has been an error!");
        } finally {
            setIsLoading(false);
        }
      };

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

    return (
        <div className="px-4 py-4">
            <div className="flex flex-col">
                <div className="col-span-3 px-4">
                    <div className="py-4">
                        <form>
                            <div className="flex flex-row justify-center items-center">
                            <div className="py-2 px-2">
                                <button 
                                    onClick={handleSubmit}
                                    type="submit" 
                                    className="bg-pink-400 px-4 py-2 rounded-2xl text-md ml-5 shadow-xl border-solid border-2 border-black transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white"
                                    >
                                        Generate 
                                        <br />a Dream!
                                </button>
                            </div>
                            <div className="py-2 px-2">
                                <button 
                                    disabled={isLoading}
                                    onClick={handleSave}
                                    type="button"  
                                    className="bg-green-400 px-4 py-2 rounded-2xl text-md ml-5 shadow-xl border-solid border-2 border-black transition duration-300 ease-in-out hover:bg-green-500 hover:text-white"
                                >
                                    Save
                                </button>
                            </div>
                            </div>
                        </form>      
                    </div>
                    {isLoading && <div>...loading</div>}
                    <div className="flex flew-grow h-96">
                        <textarea 
                            className="w-full h-full min-h-full px-4 py-4 text-xl resize-none border-solid border-2 border-black/60 rounded-lg shadow-md" 
                            value={value} 
                            onChange={(e) => setValue(e.target.value)} 
                        />
                    </div>
                </div>
                
                <div className="mt-5 flex">
                    <div className="flex">
                        <div className="flex">
                            <ul className="flex flex-wrap items-center justify-center px-4 py-4 gap-4">
                                    <li>
                                        <div className="py-12 shadow-lg border-solid border-2 border-black/60 rounded-full" style={{backgroundColor: color}}>
                                            <h2 className="px-3 text-sm text-center">Color Analysis</h2>
                                        </div>
                                    </li>
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