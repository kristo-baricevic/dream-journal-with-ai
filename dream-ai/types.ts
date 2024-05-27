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

export type AnalysisData = {
  id: string;
  createdAt: string; // Change Date to string
  updatedAt: string; // Change Date to string
  entryId: string;
  userId: string;
  mood: string;
  summary: string;
  color: string;
  interpretation: string;
  negative: boolean;
  subject: string;
  sentimentScore: number;
};
