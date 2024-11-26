import { Router } from 'express';
import generateRecipe from './routes/generateRecipe';

const recipeRoutes = (): Router => {
  const router = Router();
  generateRecipe(router);

  return router;
};

export default recipeRoutes;
