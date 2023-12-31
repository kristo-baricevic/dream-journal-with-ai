'use client';

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Question = () => {
    const [value, setValue] = useState("Look for a pattern in the Summary of five recent dream entries. What you conclude about me based off of these dream entries? Can you offer some advice and a prayer to the Dream Gods to help? Do not start your response by referencing this response or any previous responses. Avoid phrases such as in light of the new context. Begin by starting the analysis, saying the phrase in after these delineators *** Hello dreamer. Keep dreaming. Your chunk of wisdom from the dreamworld today is: *** and then end with a joke related to your analysis.");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [isQuestion, setIsQuestion] = useState(false);

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

    const handleAskQuestion = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsQuestion(!isQuestion);
        console.log("testing boolean", isQuestion);
        setLoading(false);
    };

    const handleSubmitQuestion = async (e) => {
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
        <div className="flex flex-col py-4 justify-center align-middle">
            <div className="flex flex-wrap justify-center align-middle">
                <div className="flex flex-wrap px-2 py-2">
                    <form onSubmit={handleSubmit}>
                        <div className="flex px-2">
                        <button 
                            disabled={loading}
                            type="submit" 
                            className="bg-pink-400 px-4 py-2 rounded-2xl text-lg ml-5 shadow-xl border-solid border-2 border-black transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white"
                            >
                            Get your analysis!
                        </button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col px-2 py-2">
                    <form onSubmit={handleAskQuestion}>
                        <div className="flex px-2">
                            <button 
                                disabled={loading}
                                type="submit" 
                                className="bg-purple-400 px-4 py-2 rounded-2xl text-lg ml-5 shadow-xl border-solid border-2 border-black transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white"
                                >
                                Ask a question!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex py-2 align-middle justify-center">
                {isQuestion && (
                    <div className="flex flex-wrap justify-start">
                        <form onSubmit={handleSubmitQuestion}>
                            <div className="flex py-2 align-middle justify-center">
                                <input
                                    disabled={loading}
                                    onChange={onChange}
                                    value={value}
                                    type="text" 
                                    placeholder="ask a question" 
                                    className="border border-black/20 px-4 py-2 text-lg rounded-lg shadow-lg"
                                /> 
                            </div>
                            <div className="flex py-2 align-middle justify-center">
                                <button 
                                    disabled={loading}
                                    type="submit" 
                                    className="bg-purple-300 px-4 py-2 rounded-2xl text-lg ml-5 shadow-xl border-solid border-2 border-black transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white"
                                    >
                                    Submit!
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className="flex">
                {loading && (
                    <div className="spinner-overlay">
                        <img src="/spinner.gif" alt="Loading..." />
                    </div>
                )}
                <div className="px-2 py-2 font-serif">
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
