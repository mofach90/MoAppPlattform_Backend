import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-pro',
  maxOutputTokens: 2048,
  apiKey: process.env.GEMINI_API_KEY,
});

const promptTemplate = new PromptTemplate({
  inputVariables: ['ingredients'],
  template: `Given the following ingredients: {ingredients}, generate a recipe that includes:
  - The name of the dish
  - A brief description
  - Step-by-step cooking instructions
  Format the response in JSON with keys: "name", "description", "instructions".`,
});

export const generateRecipe = async (ingredients: string) => {
  const inputPrompt = await promptTemplate.format({ ingredients });
  const response: any = await model.invoke(inputPrompt);
  const content = response?.lc_kwargs.content || '';
  const recipe = JSON.parse(content.replace(/```json|```/g, '').trim());

  return recipe;
};
