import { Router } from 'express';
import { Request, Response } from 'express';

import createCreateTasksRoutes from './createTasks';
import createGetTasksRoutes from './getTasks';
import createDeleteTasksRoutes from './deleteTasks';

const createTasksRoutes = (): Router => {
  const router = Router();

  createCreateTasksRoutes(router);
  // createGetTasksRoutes(router);
  // createDeleteTasksRoutes(router);

  return router;
};

export default createTasksRoutes;
