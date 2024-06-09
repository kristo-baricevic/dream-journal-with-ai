import { auth } from "@clerk/nextjs/server"
import { prisma } from "../../../services/prismaQuery"

export const getUserByClerkID = async (select = {id: true}) => {
    console.log("getUserByClerkID running");

    const {userId} = await auth();

    console.log("getUserByClerkID result is ", userId);

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