import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-2.0-flash-exp',
  maxOutputTokens: 2048,
  apiKey: process.env.GEMINI_API_KEY,
});

const promptTemplate = new PromptTemplate({
  inputVariables: ['ingredients', 'cuisine', 'allergies'],
  template: `Given the following ingredients: {ingredients}, generate a recipe that includes:
  - The name of the dish
  - A brief description
  - Step-by-step cooking instructions

  User prefer this cuisine {cuisine}, if empty you are free to choose.
  User would like to avoid that {allergies}, if empty you are free to choose.

  Format the response in JSON with keys: "name", "description", "instructions".
  Dont forget to use only the ingredients specified in the input.
  Here how your response will be handled in the frontend , stick to that structure:

  <>
    <DialogTitle>response.recipe.name</DialogTitle>
    <Typography>response.recipe.description</Typography>
    <Typography >
      Instructions:
    </Typography>
    <ol>
      response.recipe.instructions.map(
        (instruction: step: string, description: string, index: number) => (
          <li key=index>
            <Typography>instruction.step</Typography> <Typography>instruction.description</Typography>
          </li>
        ),
      )
    </ol>
  </>
  
  `,
});

export const generateRecipe = async (userInputs: {
  ingredients: string;
  cuisine: string;
  allergies: string;
}) => {
  const ingredients = userInputs.ingredients;
  const cuisine = userInputs.cuisine;
  const allergies = userInputs.allergies;
  const inputPrompt = await promptTemplate.format({
    ingredients,
    cuisine,
    allergies,
  });
  const response: any = await model.invoke(inputPrompt);
  const content = response?.lc_kwargs.content || '';
  const recipe = JSON.parse(content.replace(/```json|```/g, '').trim());

  return recipe;
};
