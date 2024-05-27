import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import { getEmotionColor, emotions, EmotionType } from './emotions';
import { getPersonality } from './personalities';

// Define the schema for the structured output
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.enum(Object.keys(emotions) as [EmotionType, ...EmotionType[]]).describe('the mood of the person who wrote the journal entry.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
    subject: z.string().describe('a whimsical title for the dream.'),
    color: z.enum(Object.values(emotions) as [string, ...string[]]).describe('a hexidecimal color code that represents the mood of the entry.'),
    interpretation: z.string().describe('your final analysis of the dream in about 5 or 6 sentences. Make this a dramatic interpretation. When you are done, suggest a song to listen to and a snack to eat.'),
    sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
  })
);

const getPrompt = async (entries: string, personality: string) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template: `
      {personality}
      Analyze the following journal entries holistically. Follow the instructions and format your response to match the format instructions.
      {format_instructions}

      Journal Entries:
      {entries}
    `,
    inputVariables: ['entries', 'personality'],
    partialVariables: { format_instructions },
  });

  return prompt.format({ entries, personality });
};

export const analyze = async (entries: { content: string }[], personalityType: string) => {
  const combinedEntries = entries.map(entry => entry.content).join('\n\n');
  const personality = getPersonality(personalityType);
  const input = await getPrompt(combinedEntries, personality);
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.call(input);

  try {
    const parsedResult = parser.parse(result);
    (await parsedResult).color = getEmotionColor((await parsedResult).mood as EmotionType);
    return parsedResult;
  } catch (e) {
    console.error('Failed to parse analysis result', e);
    throw new Error('Failed to analyze dream journal entries');
  }
};
