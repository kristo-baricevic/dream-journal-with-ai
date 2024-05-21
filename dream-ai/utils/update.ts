import { prisma } from "@/utils/db";


// Replace these with the correct IDs
const oldClerkId = "user_2WcvtteT4YWnUIrEZr7dBLsqTnq";

// Example of updating a user's clerkId manually
export const updateClerkId = async (oldClerkId: string, newClerkId: string) => {
    await prisma.user.update({
        where: {
            clerkId: oldClerkId,
        },
        data: {
            clerkId: newClerkId,
        },
    });
};


updateClerkId(oldClerkId, newClerkId);
