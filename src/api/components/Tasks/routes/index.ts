import { Router } from 'express';

import createTasksRoutes from './createTasks';
import getTasksRoutes from './deleteTasks';
import deleteTasksRoutes from './getTasks';

const tasksRoutes = (): Router => {
  const router = Router();

  createTasksRoutes(router);
  getTasksRoutes(router);
  deleteTasksRoutes(router);

  return router;
};

export default tasksRoutes;
