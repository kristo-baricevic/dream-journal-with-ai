// utils/formatData.ts
import { AnalysisData } from "../types";

// utils/formatData.ts
export const formatData = (data: AnalysisData[]) => {
    return data.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  };
  