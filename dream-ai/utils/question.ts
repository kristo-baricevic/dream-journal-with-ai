import { OpenAI } from 'langchain/llms/openai';
import { loadQARefineChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/document';

export const qa = async (question: string, entries: { id: string, createdAt: Date, content: string }[]) => {
  try {
    const docs = entries.map(
      (entry) =>
        new Document({
          pageContent: entry.content,
          metadata: { source: entry.id, date: entry.createdAt },
        })
    );

    const model = new OpenAI({ temperature: 0.8, modelName: 'gpt-3.5-turbo' });
    const chain = loadQARefineChain(model);
    const embeddings = new OpenAIEmbeddings();
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const relevantDocs = await store.similaritySearch(question);
    const res = await chain.call({
      input_documents: relevantDocs,
      question,
    });

    return res.output_text;
  } catch (error) {
    console.error('Error in QA process:', error);
    throw new Error('Failed to process QA request');
  }
};
