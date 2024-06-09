import { auth } from "@clerk/nextjs/server"
import { prisma } from "../../../services/prismaQuery"
import { redirect } from "next/navigation";

export const getUserByClerkID = async (select = {id: true}) => {

    const {userId} = await auth();

    console.log("getUserByClerkID result is ", userId);

    if (!userId) {
        // temporarily redirecting to because sign out is sending user to journal page
        redirect("/");
    }

    const user = await prisma.user.findUniqueOrThrow ({
        where: {
            clerkId: userId as string,
        },
        select,
    })

    return user;
}