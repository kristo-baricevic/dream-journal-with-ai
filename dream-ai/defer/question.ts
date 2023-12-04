import { defer } from "@defer/client";
// import { OpenAI } from 'langchain/llms/openai';
import { TextServiceClient } from 'google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import { GooglePaLMEmbeddings } from 'langchain/embeddings/googlepalm';
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

    // const model = new GooglePaLMEmbeddings({ 
    //   apiKey: `${PALM_API_KEY}`,
    //   temperature: 0.8, 
    //   modelName: 'text-bison-001' 
    // });

    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const MODEL_NAME = "models/text-bison-001";

    client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: question,
      },
    })
    .then((result) => {
      console.log(JSON.stringify(result, null, 2))
    });

    const chain = loadQARefineChain(client);
    const embeddings = new GooglePaLMEmbeddings();
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

  export default defer(qa, {
    concurrency: 10,
    retry: 5,
  });