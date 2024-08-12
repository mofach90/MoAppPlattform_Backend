import { Router } from 'express';

import createTasksRoutes from './createTasks';
import getTasksRoutes from './deleteTasks';
import deleteTasksRoutes from './getTasks';
import updateTasksRoutes from './updateTasks';
import getTokenPushNotification from './getTokenPushNotification';

const tasksRoutes = (): Router => {
  const router = Router();

  createTasksRoutes(router);
  getTasksRoutes(router);
  deleteTasksRoutes(router);
  updateTasksRoutes(router);
  getTokenPushNotification(router);

  return router;
};

export default tasksRoutes;
