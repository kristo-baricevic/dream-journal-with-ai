'use client';

import { ResponsiveContainer, Line, XAxis, Tooltip, LineChart, TooltipProps } from 'recharts';

type AnalysisData = {
    sentimentScore: number;
    createdAt: string; 
  };
  
const CustomTooltip: React.FC<TooltipProps<AnalysisData, "createdAt">> = ({
  payload,
  label,
  active,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: data.color }}
        ></div>
        <p className="label text-sm text-black/30">{label}</p>
        <p className="intro text-xl uppercase">{data.mood}</p>
      </div>
    );
  }
  return null;
};

const HistoryChart: React.FC<{ data: AnalysisData[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <LineChart width={300} height={100} data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;