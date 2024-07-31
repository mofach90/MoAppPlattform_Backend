import { Router } from 'express';
import { createTask } from '../controllers/createTaskController';

const createCreateTasksRoutes = (router: Router) => {
  router.post('/create-task', createTask);
};

export default createCreateTasksRoutes;
