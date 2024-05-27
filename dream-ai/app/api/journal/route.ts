import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/prismaQuery";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const maxDuration = 120;
export const dynamic = 'force-dynamic';


export const POST = async () => {
    try {
        const user = await getUserByClerkID();
        const entry = await prisma.journalEntry.create({
            data: {
                userId: user.id,
                content: 'Write about your dream!'
            },
        })
        revalidatePath("/journal");

        return NextResponse.json({ data: entry });
    } catch (error) {
        console.error("Error creating entry:", error);
        return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
    }
}