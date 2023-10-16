import HistoryChart from "@/components/HistoryChart";
import RadarChart from "@/components/RadarChart";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
    const user = await getUserByClerkID();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "asc",
        }
    })

    const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0);
    const avg = Math.round(sum / analyses.length);
    console.log("avg");
    return {analyses, avg}
}

const History = async () => {
    const {avg, analyses} = await getData();
    console.log("hi");
    return (
        <div className="w-full h-full">
            <div>{`Avg. Sentiment ${avg}`}</div>
            <div></div>
            <div className="w-full h-full">
                <HistoryChart data={analyses} />
            </div>
            <div className="w-full h-full">
                <RadarChart data={analyses} />
            </div>
        </div>
    )
};

export default History;