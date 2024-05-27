// types.ts
export type JournalEntry = {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    analysis?: {
        summary: string;
        color: string;
        subject: string;
    };
};
