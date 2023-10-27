'use client';

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Question = () => {
    const [value, setValue] = useState("What do all of my dreams have in common? If nothing, say fish.");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState();

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
            {loading && (<div>...loading</div>)}
            {response && (<div>{response}</div>)}
        </div>
    )
}

export default Question;
