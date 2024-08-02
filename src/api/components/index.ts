import { Router } from 'express';
import { checkAuthforApps } from '../../services/auth/checkAuthforApps';
import { createAuthRoutes } from './Auth/routes';
import tasksRoutes from './Tasks/routes';

export function registerApiRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}/auth`, createAuthRoutes());
  router.use(`${prefix}/todo-app/tasks`, checkAuthforApps, tasksRoutes());
}
