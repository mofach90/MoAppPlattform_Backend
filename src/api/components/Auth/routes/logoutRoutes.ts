import { Router } from 'express';
import { logoutMiddleware } from '../../../../services/auth/logout';
import {
  clearController,
  logoutController,
} from '../controllers/logoutControllers';

export function createLogoutRoutes(router: Router) {
  router.get('/social-auth/logout', logoutMiddleware, logoutController);
  router.get('/clear', clearController);
}
