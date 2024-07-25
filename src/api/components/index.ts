import { Router } from 'express';
import { checkAuthforApps } from '../../services/auth/checkAuthforApps';
import { createAuthRoutes } from './Auth/routes';
import createTasksRoutes from './Tasks/routes';

export function registerApiRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}/auth`, createAuthRoutes());
  router.use(`${prefix}/tasks`, checkAuthforApps, createTasksRoutes());
}
