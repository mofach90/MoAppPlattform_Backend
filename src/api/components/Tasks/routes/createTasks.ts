import { Router } from 'express';
import { createTaskController } from '../controllers/createTaskController';

const createCreateTasksRoutes = (router: Router) => {
  router.post('/create-task', createTaskController);
};

export default createCreateTasksRoutes;
