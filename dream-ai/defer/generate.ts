import { defer } from "@defer/client";
import { OpenAI } from 'langchain/llms/openai';

export const aiGenerate = async (question: string) => {
    console.log("inside ai generate");
    console.log("question", question);

    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
    const res = await model.call(question);

    console.log("after the generation.");
    console.log(res);
  
    return res;
  };

  export default defer(aiGenerate);