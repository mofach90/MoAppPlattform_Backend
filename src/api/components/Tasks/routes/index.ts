import { Router } from 'express';

import createTasksRoutes from './createTasks';
import getTasksRoutes from './deleteTasks';
import deleteTasksRoutes from './getTasks';
import updateTasksRoutes from './updateTasks';

const tasksRoutes = (): Router => {
  const router = Router();

  createTasksRoutes(router);
  getTasksRoutes(router);
  deleteTasksRoutes(router);
  updateTasksRoutes(router);

  return router;
};

export default tasksRoutes;
