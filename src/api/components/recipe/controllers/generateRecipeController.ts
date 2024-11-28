import { Request, Response } from 'express';

export const generateRecipeController = (req: Request, res: Response) => {
  const { recipe, imageBuffer } = req.body;

  console.log('Recipe:', recipe);

  // Set headers to indicate image content type
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', `inline; filename="${recipe.name}.png"`);

  console.log('Recipe:', recipe);

  // Send the image buffer as the response
  res.send(imageBuffer);
};
