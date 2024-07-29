import { Router } from 'express';
import createGetTasksRoutes from './getTasks';

const createTasksRoutes = (): Router => {
  const router = Router();

  //  createCreateTasksRoutes(router);
  createGetTasksRoutes(router);
  //  createDeleteTasksRoutes(router);

  return router;
};

export default createTasksRoutes;
