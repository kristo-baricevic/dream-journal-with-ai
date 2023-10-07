import { prisma } from "@/utils/db"
import { currentUser } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/server";
import { create } from "domain";
import { redirect } from "next/navigation";

const createNewUser = async () => {
    const user = await currentUser();
    console.log(user);

    const match = await prisma.user.findUnique({
        where: {
            clerkId: user.id as string,
        },
    })

    if (!match) {
        await prisma.user.create({
          data: {
            clerkId: user.id,
            email: user?.emailAddresses[0].emailAddress,
          },
        })
      }

    redirect("/journal");
}

const NewUser = async () => {
    await createNewUser();
    return <div>...loading</div>
}

export default NewUser