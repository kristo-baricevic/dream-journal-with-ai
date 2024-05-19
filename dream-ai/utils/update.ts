import { prisma } from "@/utils/db";


// Replace these with the correct IDs
const oldClerkId = "user_2WcvtteT4YWnUIrEZr7dBLsqTnq";
const newClerkId = "user_2WM6xchRzK0mzfw7O61fISJahCN";

// Example of updating a user's clerkId manually
const updateClerkId = async (oldClerkId: string, newClerkId: string) => {
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
