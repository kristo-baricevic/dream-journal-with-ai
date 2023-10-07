import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
    const user = await getUserByClerkID();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        select: {
            sentimentScore: true,
        },
    })
}

const History = () => {
    return <div>history</div>
};

export default History;