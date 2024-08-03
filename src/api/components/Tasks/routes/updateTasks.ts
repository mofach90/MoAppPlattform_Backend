import { Router } from 'express';
import { updateTaskController } from '../controllers/updateTaskController';

const updateTasksRoutes = (router: Router) => {
  router.post('/update-task', updateTaskController);
};

export default updateTasksRoutes;
