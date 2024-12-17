import { Router } from 'express';
import { deleteTaskController } from '../controllers/deleteTaskController';

const createDeleteTasksRoutes = (router: Router) => {
  router.post('/delete-task', deleteTaskController);
};

export default createDeleteTasksRoutes;
