import { Router } from 'express';

import createTasksRoutes from './createTasks';
import getTasksRoutes from './deleteTasks';
import deleteTasksRoutes from './getTasks';
import updateTasksRoutes from './updateTasks';
import getTokenPushNotification from './getTokenPushNotification';
import sendNotification from './sendNotification';

const tasksRoutes = (): Router => {
  const router = Router();

  createTasksRoutes(router);
  getTasksRoutes(router);
  deleteTasksRoutes(router);
  updateTasksRoutes(router);
  getTokenPushNotification(router);
  sendNotification(router);
  return router;
};

export default tasksRoutes;
