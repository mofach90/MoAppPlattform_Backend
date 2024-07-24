import { Router } from 'express';
import { createTask } from '../controllers/createTaskController';
import { Request, Response } from 'express';

const createCreateTasksRoutes = (router: Router) => {
  /*   create tasks routes   */

  // router.post('/create-task',  (req: Request, res: Response) => {
  //   res.status(200).send({
  //     message: 'test confirmed',
  //   });
  // })
  router.post('/create-task', createTask);
};

export default createCreateTasksRoutes;
