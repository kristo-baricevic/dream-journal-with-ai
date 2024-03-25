'use client';

import { useState, useEffect } from "react";

const lyrics = [
    {
        "id": 1,
        "content": "Its Your Dreams That Make You Feel Free / Dream, Dream, Baby, Dream"
    },
    {
        "id": 2,
        "content": "A candy-colored clown they call the sandman / Tiptoes to my room every night"
    },
    {
        "id": 3,
        "content": "Goodnight, my angel, time to close your eyes / And save these questions for another day"
    },
    {
        "id": 4,
        "content": "Stars shining bright above you / Night breezes seem to whisper 'I love you'"
    },
    {
        "id": 5,
        "content": "Drift away and dream, little one / The stars tip-toe as the evening comes"
    },
    {
        "id": 6,
        "content": "The night is so still, it makes me ill / Like a dying rose in a faded dream"
    },
    {
        "id": 7,
        "content": "In the darkness, I find peace / As I drift into the realm of dreams"
    },
    {
        "id": 8,
        "content": "In the silence of the night, I hear whispers of the stars"
    },
]

const LyricIterator = () => {
    const [currentLyric, setCurrentLyric] = useState(0);

    useEffect(() => {
        // Setup an interval to change the lyric
        const lyricInterval = setInterval(() => {
            setCurrentLyric((current) => (current + 1) % lyrics.length);
        }, 5000);

        // Cleanup the interval
        return () => clearInterval(lyricInterval);
    }, []);

    return (
        <div className="flex justify-center text-center px-2">
            <h3 className="text-xl font-serif fade-in">
                {lyrics[currentLyric].content}
            </h3>
        </div>
    );
}

export default LyricIterator;
