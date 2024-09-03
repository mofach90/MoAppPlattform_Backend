import { Router } from 'express';

import createTasksRoutes from './createTasks';
import deleteTasksRoutes from './deleteTasks';
import getTasksRoutes from './getTasks';
import getTokenPushNotification from './getTokenPushNotification';
import sendNotification from './sendNotification';
import updateTasksRoutes from './updateTasks';
import deleteTopicsRoutes from './deleteTopic';

const tasksRoutes = (): Router => {
  const router = Router();

  createTasksRoutes(router);
  getTasksRoutes(router);
  deleteTasksRoutes(router);
  updateTasksRoutes(router);
  getTokenPushNotification(router);
  sendNotification(router);
  deleteTopicsRoutes(router);

  return router;
};

export default tasksRoutes;
