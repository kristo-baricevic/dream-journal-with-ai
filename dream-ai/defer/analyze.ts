import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import {
  StructuredOutputParser,
  OutputFixingParser,
} from 'langchain/output_parsers';
import { z } from 'zod';
import { defer } from '@defer/client';

//The is the format of the dream journal, which is given to the ai
//in order to analyze it and render on its individual page.

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z
          .string()
          .describe(
            'the mood of the person who wrote the journal entry. Make sure the first letter is capitalized.'
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
            'your final analysis of the dream in about 5 or 6 sentences. Make this a dramatic interpretation. When you are done, suggest as a sacrifice to the Eternal Beings of the Dream World: a vegetable to eat, a potion to drink, or a line to recite as an offering.'
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

export default defer(analyze, {
    concurrency: 10,
    retry: 5,
  });