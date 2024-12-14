import { Router } from 'express';
import { generateRecipeController } from '../controllers/generateRecipeController';
import { recipeMiddleware } from '../../../../services/recipe/recipeMiddleware';

const generateRecipe = (router: Router) => {
  router.post('/generate-recipe',  recipeMiddleware ,  generateRecipeController);
};

export default generateRecipe;
