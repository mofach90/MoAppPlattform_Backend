import { Router } from 'express';
import { generateRecipeController } from '../controllers/generateRecipeController';

const generateRecipe = (router: Router) => {
  router.post('/create-task', generateRecipeController);
};

export default generateRecipe;
