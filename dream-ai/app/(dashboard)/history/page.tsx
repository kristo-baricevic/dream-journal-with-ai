import HistoryChart from "@/components/HistoryChart";
import RadarChart from "@/components/RadarChart";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import PieChart from "@/components/PieChart";

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
        <div className="w-full h-full bg-pink-100 px-4 py-4">
            <div className="flex flex-col">
                <div className="w-full h-full bg-pink-200 px-4 py-4">
                    <HistoryChart data={analyses} />
                </div>
                <div className="flex w-full py-5 gap-2 flex-wrap justify-center bg-pink-300">
                    <div className="flex py-10 px-2 bg-pink-100 rounded-lg shadow-md">
                        <RadarChart data={analyses} />
                    </div>
                    <div className="flex py-10 px-2 bg-pink-400 rounded-lg shadow-md">
                        <PieChart data={analyses} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default History;