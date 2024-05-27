import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import {
  StructuredOutputParser,
  OutputFixingParser,
} from 'langchain/output_parsers';
import { z } from 'zod';

// Define the schema for the structured output
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe('the mood of the person who wrote the journal entry. Make sure the first letter is capitalized.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
    subject: z.string().describe('a whimsical title for the dream.'),
    color: z.string().describe('a hexidecimal color code that represents the mood of the entry. For example, #0E86D4 for inspired, #F8CF2C for happy, #F9521E for angry. Avoid white, gray, and black.'),
    interpretation: z.string().describe('your final analysis of the dream in about 5 or 6 sentences. Make this a dramatic interpretation. When you are done, suggest as a sacrifice to the Eternal Beings of the Dream World: a vegetable to eat, a potion to drink, or a line to recite as an offering.'),
    sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
  })
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template: 'You are doctor of dream analysis. You have a PhD in Psychology with a Masters in Dream Analysis from the University of Dreams. You have magical powers to interpret dreams. Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! When you are done, suggest a song to listen to and a snack to eat.\n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  return prompt.format({ entry: content });
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (e) {
    console.error('Failed to parse analysis result', e);
    throw new Error('Failed to analyze dream journal entry');
  }
};
