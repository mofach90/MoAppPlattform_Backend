import { Router } from 'express';
import { createAuthRoutes } from './Auth/routes';
import createTasksRoutes from './Tasks/routes';
import { checkAuthforApps } from '../../services/auth/checkAuthforApps';

export function registerApiRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}/auth`, createAuthRoutes());
  router.use(`${prefix}/tasks`, checkAuthforApps ,createTasksRoutes());
}
