import { defer } from "@defer/client";
import { OpenAI } from 'langchain/llms/openai';
import { loadQARefineChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/document';


export const qa = async (question: string, entries: {id: string, createdAt: Date, content: string}[]) => {
    const docs = entries.map(
      (entry) =>
        new Document({
          pageContent: entry.content,
          metadata: { source: entry.id, date: entry.createdAt },
        })
    );

    console.log("inside QA");
    console.log("question");

    const model = new OpenAI({ temperature: 0.8, modelName: 'gpt-3.5-turbo' });
    const chain = loadQARefineChain(model);
    const embeddings = new OpenAIEmbeddings();
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const relevantDocs = await store.similaritySearch(question);
    const res = await chain.call({
      input_documents: relevantDocs,
      question,
    });

    console.log("after the generation.");
    console.log(res);
  
    return res.output_text;
  };

  export default defer(qa);