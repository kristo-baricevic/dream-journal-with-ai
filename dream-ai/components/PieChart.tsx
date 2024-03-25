'use client'

import React from 'react';
import { PieChart, Pie } from 'recharts';

type AnalysisData = {
    color: string;
    sentimentScore: number;
    createdAt: string;
};

const PieChartComponent: React.FC<{ data: AnalysisData[] }> = ({ data }) => {
    const uniqueColors: string[] = Array.from(new Set(data.map((item: AnalysisData) => item.color)));
    console.log("unique colors are", uniqueColors);

    const colorData = uniqueColors.map((color) => {
        console.log("color", color);
        let count = 0;
        for (let i=0; i < data.length - 1; i++)
             if (data[i].color === color) {
            count++;
        }
        return { name: color, value: count }; 
    });

    console.log("colorData", colorData);

    return (
        <>
            <div className="flex flex-col text-center">
                <h1 className="flex justify-center text-center">Dreams by Color Analysis</h1>
                <PieChart width={450} height={250}>
                    <Pie
                        dataKey="value"
                        data={colorData}
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                    />
                </PieChart>
            </div>
        </>
    );
};

export default PieChartComponent;
