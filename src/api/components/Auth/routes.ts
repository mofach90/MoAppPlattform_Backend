import { Router } from 'express';
import { basicAuthMiddleware } from '../../../services/auth/basicauth';
import { formBasedAuth } from '../../../services/auth/formBasedAuthentication';
import { googleAuthenticationCallback } from '../../../services/auth/googleAuthenticationCallback';
import { manageSessions } from '../../../services/auth/manageSessions';
import { verifyJwtFromCookie } from '../../../services/auth/verifyJwtFromCookie';
import { verifyJwtFromLocalStorage } from '../../../services/auth/verifyJwtFromLocalStorage';
import {
  checkAuthJwtCoookie,
  checkAuthJwtLocalStorage,
  checkAuthSessionIdCookie,
  checkBasicAuth,
  clearController,
  facebookAuthenticationCallbackController,
  googleAuthenticationCallbackController,
  loginUsingBasicAuthentication,
  loginUsingJwtCookie,
  loginUsingJwtLocalStorage,
  loginUsingSessionId,
  logoutController,
} from './controllers';
import { googleAuthentication } from '../../../services/auth/googleAuthentication';
import { logoutMiddleware } from '../../../services/auth/logout';
import { facebookAuthentication } from '../../../services/auth/facebookAuthentication';
import { facebookAuthenticationCallback } from '../../../services/auth/facebookAuthenticationCallback';
import passport from '../../../config/passport-config';
import logger from '../../../config/logger';
import { verifyBasicAuth } from '../../../services/auth/verifyBasedAuth';

export function createAuthRoutes(): Router {
  const router = Router();

  router.get('/check-session-id-cookie', checkAuthSessionIdCookie);

  router.get(
    '/check-jwt-local-storage',
    verifyJwtFromLocalStorage,
    checkAuthJwtLocalStorage,
  );

  router.get('/check-jwt-cookie', verifyJwtFromCookie, checkAuthJwtCoookie);
  router.get('/check-basic-authentication', verifyBasicAuth, checkBasicAuth);

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

  router.get('/social-auth/google', manageSessions, googleAuthentication);
  router.get('/social-auth/facebook', manageSessions, facebookAuthentication);
  router.get('/check-google-auth', manageSessions, (req, res, next) => {
    res.status(403).send('in GOOGLE NOT AUTH ');
  });

  router.get(
    '/social-auth/google/callback',
    googleAuthenticationCallback,
    googleAuthenticationCallbackController,
  );
  router.get(
    '/social-auth/facebook/callback',
    facebookAuthenticationCallback,
    facebookAuthenticationCallbackController,
  );


  router.get('/social-auth/logout', logoutMiddleware, logoutController);
  router.get('/clear', clearController);

  return router;
}
