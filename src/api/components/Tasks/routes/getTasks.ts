import { Router } from 'express';
import getTasksController from '../controllers/getTasksControlller';

const createGetTasksRoutes = (router: Router) => {
  /*   get tasks routes   */
  router.get('/get-tasks', getTasksController);
};

export default createGetTasksRoutes;
