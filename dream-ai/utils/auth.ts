import { auth } from "@clerk/nextjs"
import { prisma } from "./db"
import type { User } from '@clerk/nextjs/api'

export const getUserByClerkID = async (select = {id: true}) => {
    const {userId} = await auth();

    const user = await prisma.user.findUniqueOrThrow ({
        where: {
            clerkId: userId as string,
        },
        select,
    })

    return user;
}