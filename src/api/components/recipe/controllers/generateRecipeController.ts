import { Request, Response } from 'express';

export const generateRecipeController = (req: Request, res: Response) => {
  const { recipe, imageBuffer } = req.body;

  console.log('Recipe:', recipe);

  // Set headers to indicate image content type
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', `inline; filename="${recipe.name}.png"`);

  console.log('Recipe:', recipe);
  const imageBase64 = imageBuffer.toString('base64');

  // Send the image buffer as the response
  // Structure the response to include both recipe and image
  res.json({
    recipe,
    image: `data:image/png;base64,${imageBase64}`,
  });
};
