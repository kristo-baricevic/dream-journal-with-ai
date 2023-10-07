'use client';

import { useState } from "react";

const Question = () => {
    const [value, setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value);
        //do things here
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="py-4">
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={onChange}
                    value={value}
                    type="text" 
                    placeholder="ask a question" 
                    className="border border-black/20 px-4 py-2 text-lg rounded-lg"
                />
                <button type="submit" className="bg-blue-400 px-4 py-2 rounded-lg text-lg">
                    Ask
                </button>
            </form>
        </div>
    )
}

export default Question;
