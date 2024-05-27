"use client";

import { askQuestion } from "@/utils/clientApi";
import { SetStateAction, useState } from "react";
import PersonalitySelection from "./PersonalityDropdown";
import { getPersonality } from "@/utils/personalities";

const Question = () => {
    const [value, setValue] = useState("You are an eccentric professor. " +
    "Look for a pattern in the Summary of five recent dream entries. " +
    "Draw some conclusions about the dreamer based off the totality of " +
    "the dream experiences. Provide to the dreamer advice for how they " +
    "can adapt their life to incorporate their dreams meanings. " + 
    "Do not start your response by referencing this response or any " + 
    "previous responses. Avoid phrases such as 'in light of the new context'. " +
    "Begin immediately by starting the analysis. Then, " + 
    "think of a random number between 1 and 5. Keep the number to yourself." +
    "Do not share the number the picked. " +
    "Instead, use the number to inform how you end the assessment." +
    "End with a piece of advice that starts with the phrase " + 
    "'The dream gods want you to '" + 
    "and then do one of the following:" +
    "If the number is 1, end by suggesting a song to listen to based off a dream. " +
    "If the number is 2, end by suggesting a mantra for meditation. " +
    "If the number is 3, end by suggesting a food to eat. " +
    "If the number is 4, end by suggesting an activity. " +
    "If the number is 5, end by suggesting a journal prompt.");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [isQuestion, setIsQuestion] = useState(false);

    const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        const answer = await askQuestion(value);
        setResponse(answer);
        setValue("");
        setLoading(false);
    };

    const handleAskQuestion = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setIsQuestion(!isQuestion);
        setLoading(false);
    };

    const handleSubmitQuestion = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        const answer = await askQuestion(value);
        setResponse(answer);
        setValue("");
        setLoading(false);
    };


    return (
        <div className="flex flex-col py-4 justify-center align-middle">
            <div className="flex justify-center mb-4">
                <PersonalitySelection onSelect={getPersonality} />
            </div>
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
            <div className="py-2">
                {loading && (
                    <div className="spinner-overlay">
                        <img src="/spinner.gif" alt="Loading..." />
                        <p> ...The doctor is thinking. This may take a moment!</p>
                    </div>
                )}
                <div className="px-2 py-6 font-serif">
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
