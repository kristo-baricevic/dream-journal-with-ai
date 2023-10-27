'use client';

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Question = () => {
    const [value, setValue] = useState("Based off of what my dreams have in common, what light phrase of silly encouragement can you give to me? Do not start your response by referencing this response or any previous responses. Begin by starting the analysis, saying the phrase in between these delineators: *** Hello dreamer. Keep dreaming. Your chunk of wisdom from the dreamworld today is: *** and then end with a joke. If there are no entries, start with a salutation and an invitation to explore the dream world together.");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
        console.log("after on change has run");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("about to askQuestion");
        const answer = await askQuestion(value);
        console.log("answer is here", answer);
        setResponse(answer);
        setValue("");
        setLoading(false);
    };

    return (
        <div className="py-4">
            <div className="px-2">
            <form onSubmit={handleSubmit}>
                <input
                    disabled={loading}
                    onChange={onChange}
                    value={value}
                    type="text" 
                    placeholder="ask a question" 
                    className="border border-black/20 px-4 py-2 text-lg rounded-lg shadow-lg"
                />
                <button 
                    disabled={loading}
                    type="submit" 
                    className="bg-pink-400 px-4 py-2 rounded-2xl text-lg ml-5 shadow-xl border-solid border-2 border-black transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white"
                    >
                    Ask
                </button>
            </form>
            </div>
            <div>
                {loading && (<div>...loading</div>)}
                <div className="px-2 py-4 font-serif">
                    {response && (
                        <div className="bg-slate-100 p-4 rounded-2xl border-solid border-2 border-blue-300">
                            <p>{response}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Question;
