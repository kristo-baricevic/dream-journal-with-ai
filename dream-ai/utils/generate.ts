import { OpenAI } from 'langchain/llms/openai';

export const aiGenerate = async (question: string) => {
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
    const res = await model.call(question);  
    return res;
};