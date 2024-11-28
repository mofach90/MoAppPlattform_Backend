import { Request, Response, NextFunction } from 'express';
import { generateRecipe } from './generateRecipe';
import { generateImage } from './generateImage';

export const recipeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsText = req.body.ingredients || 'chicken, pepper, rice, olive oil, curry powder';

    // Generate the recipe
    const recipe = await generateRecipe(ingredientsText);

    if (!recipe) {
      return res.status(500).json({ message: 'Failed to generate recipe.' });
    }

    // Generate the image prompt
    const imagePrompt = `An appetizing, high-resolution photo of ${recipe.name}, which is ${recipe.description}.`;

    // Generate the image
    const imageBuffer = await generateImage(imagePrompt);

    if (!imageBuffer) {
      return res.status(500).json({ message: 'Failed to generate image.' });
    }

    // Attach results to the request object
    req.body.recipe = recipe;
    req.body.imageBuffer = imageBuffer;

    next();
  } catch (error) {
    next(error);
  }
};
