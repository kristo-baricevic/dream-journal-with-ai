import { analyze } from "@/utils/ai";
import { deleteEntry } from "@/utils/api";
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

    const analysis = (await analyze(updatedEntry.content));


    const updated = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        create: {
            userId: user.id,
            entryId: updatedEntry.id,
            ...analysis,
        },
        update: analysis,
    })

    return NextResponse.json({ data: {...updatedEntry, analysis: updated} });
}

// Import other necessary modules and functions...

export const DELETE = async (request: Request, { params }) => {
    const user = await getUserByClerkID();

    const entryToDelete = await prisma.journalEntry.findFirst({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
    });

    if (!entryToDelete) {
        return NextResponse.error({ message: 'Entry not found', status: 404 });
    }

    await prisma.journalEntry.delete({
        where: {
            id: entryToDelete.id,
        },
    });

    return NextResponse.json({ message: 'Entry deleted successfully' });


};
