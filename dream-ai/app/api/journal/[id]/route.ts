import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async ( request: Request, { params }) => {
    const { content } = await request.json();
    const user = await getUserByClerkID();

    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            content,
        },
    })

    console.log(user.id);
    console.log(params.id);
    console.log(content);

    return NextResponse.json({ data: updatedEntry });
}
