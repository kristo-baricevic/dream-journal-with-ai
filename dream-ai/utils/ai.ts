import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { loadQARefineChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import {
  StructuredOutputParser,
  OutputFixingParser,
} from 'langchain/output_parsers';
import { Document } from 'langchain/document';
import { z } from 'zod';


//The is the format of the dream journal, which is given to the ai
//in order to analyze it and render on its individual page.

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z
          .string()
          .describe(
            'the mood of the person who wrote the journal entry.'
          ),
        summary: z
          .string()
          .describe(
            'quick summary of the entire entry.'
          ),
        negative: z
          .boolean()
          .describe(
            'is the journal entry negative? (i.e. does it contain negative emotions?).'
          ),
        subject: z
          .string()
          .describe(
            'a whimsical title for the dream.'
          ), 
        color: z
          .string()
          .describe(
            'a hexidecimal color code that represents the mood of the entry. For example, blue for sad, yellow for happy. If an entry does not match these, make it up. Just avoid white, gray, and black.'
          ),
        interpretation: z
          .string()
          .describe(
            'your final analysis of the dream in about 5 or 6 sentences. Make this a dramatic interpretation. When you are done, suggest a vegetable or eat, a tea to drink, or a line to recite as an offering to the dream gods.'
          ),
        sentimentScore: z
          .number()
          .describe(
            'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
          ),
    })
  );

  const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions()
  
    const prompt = new PromptTemplate({
      template:
        'You are doctor of dream analysis. You have a Phd in Psychology with a Masters in Dream Analysis from the University of Dreams. You have magical powers to interpret dreams. Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! When you are done, suggest a song to listen to and a snack to eat.\n{format_instructions}\n{entry}',
      inputVariables: ['entry'],
      partialVariables: { format_instructions },
    });
  
    const input = await prompt.format({
      entry: content,
    });
  
    return input
  };

export const analyze = async (content) => {
    const input = await getPrompt(content);
    const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'});
    const result = await model.call(input);

    try {
        return parser.parse(result);
    } catch (e) {
        console.log(e);
    }
};

export const qa = async (question: string, entries: {id: string, createdAt: Date, content: string}[]) => {
    const docs = entries.map(
      (entry) =>
        new Document({
          pageContent: entry.content,
          metadata: { source: entry.id, date: entry.createdAt },
        })
    );

    console.log("inside QA");

    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
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

  export const aiGenerate = async (question: string) => {
    console.log("inside ai generate");
    console.log("question", question);

    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
    const res = await model.call(question);

    console.log("after the generation.");
    console.log(res);
  
    return res;
  };
