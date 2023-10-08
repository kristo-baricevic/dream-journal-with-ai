import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { User } from "@clerk/nextjs/server";
import { create } from "domain";

const createNewUser = async () => {
    console.log("test");
    const user = await currentUser();

    const match = await prisma.user.findUnique({
        where: {
            clerkId: user.id as string,
        },
    })

    if (!match) {
        const newUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user?.emailAddresses[0].emailAddress,
            }
        })
    }

    redirect("/journal");
}

const NewUser = async () => {
    await createNewUser();
    return <div>...loading</div>
}

export default NewUser;