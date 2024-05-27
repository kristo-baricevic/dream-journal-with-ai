import { auth } from "@clerk/nextjs/server"
import { prisma } from "./prismaQuery"

export const getUserByClerkID = async (select = {id: true}) => {
    console.log("auth running");

    const {userId} = await auth();

    console.log("test auth", userId);

    if (!userId) {
        throw new Error("User is not authenticated");
    }

    const user = await prisma.user.findUniqueOrThrow ({
        where: {
            clerkId: userId as string,
        },
        select,
    })

    return user;
}