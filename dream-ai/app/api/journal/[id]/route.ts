import { analyze } from "@/defer/analyze";
import { deleteEntry } from "@/utils/api";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const maxDuration = 120;
export const dynamic = 'force-dynamic';


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
    console.log("testing delete");
    console.log(params);

    const deleteEntry = await prisma.journalEntry.delete({
        where: {
            id: params.id,
        },
    });

    if (!deleteEntry) {
        console.log("entry not deleted");
    };

    return NextResponse.json({ message: 'Entry deleted successfully' });

};
