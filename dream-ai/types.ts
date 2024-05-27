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
  createdAt: Date; 
  updatedAt: Date;
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
