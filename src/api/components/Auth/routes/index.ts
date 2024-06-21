import { Router } from 'express';
import { createCheckRoutes } from './checkRoutes';
import { createLoginRoutes } from './loginRoutes';
import { createLogoutRoutes } from './logoutRoutes';

export function createAuthRoutes(): Router {
  const router = Router();

  createCheckRoutes(router);
  createLoginRoutes(router);
  createLogoutRoutes(router);

  return router;
}
