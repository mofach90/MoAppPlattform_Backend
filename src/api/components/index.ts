import { Request, Response, Router } from 'express';
import { createAuthRoutes } from './Auth/routes';
import createTasksRoutes from './Tasks/routes';

export function registerApiRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}/auth`, createAuthRoutes());
<<<<<<< Updated upstream
  router.use(`${prefix}/tasks`, checkAuthforApps, createTasksRoutes());
=======
  // router.use(`${prefix}/tasks`, checkAuthforApps ,createTasksRoutes());
  // router.use(`${prefix}/tasks`, checkAuthforApps ,createTasksRoutes());
  router.use(`${prefix}/tasks` ,createTasksRoutes());
  // router.use(`${prefix}/tasks`, (req: Request, res: Response) => {
  //   res.status(200).send({
  //     message: 'test confirmed',
  //   });
  // });
>>>>>>> Stashed changes
}
