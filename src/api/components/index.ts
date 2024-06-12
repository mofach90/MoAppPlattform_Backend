import { Router } from 'express';
import { createAuthRoutes } from './Auth/routes';

export function registerApiRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}/auth`, createAuthRoutes());
}
