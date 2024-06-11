import { Router } from 'express';
import { basicAuthMiddleware } from '../../../services/auth/basicauth';
import { formBasedAuth } from '../../../services/auth/formBasedAuthentication';
import { verifyJwtFromCookie } from '../../../services/auth/verifyJwtFromCookie';
import { verifyJwtFromLocalStorage } from '../../../services/auth/verifyJwtFromLocalStorage';
import {
  checkAuthJwtCoookie,
  checkAuthJwtLocalStorage,
  checkAuthSessionIdCookie,
  loginUsingBasicAuthentication,
  loginUsingJwtCookie,
  loginUsingJwtLocalStorage,
  loginUsingSessionId,
} from './controllers';

export function createAuthRoutes(): Router {
  const router = Router();
  router.get('/check-session-id-cookie', checkAuthSessionIdCookie);
  router.get(
    '/check-jwt-local-storage',
    verifyJwtFromLocalStorage,
    checkAuthJwtLocalStorage,
  );
  router.get('/check-jwt-cookie', verifyJwtFromCookie, checkAuthJwtCoookie);
  router.post(
    '/login-jwt-in-localStorage',
    formBasedAuth,
    loginUsingJwtLocalStorage,
  );
  router.post('/login-jwt-in-cookie', formBasedAuth, loginUsingJwtCookie);
  router.post('/login-sessionid', formBasedAuth, loginUsingSessionId);
  router.get(
    '/login-basic-authentication',
    basicAuthMiddleware,
    loginUsingBasicAuthentication,
  );
  return router;
}
