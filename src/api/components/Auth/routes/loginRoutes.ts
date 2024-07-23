import { Router } from 'express';
import { basicAuthMiddleware } from '../../../../services/auth/basicauth';
import { facebookAuthentication } from '../../../../services/auth/facebookAuthentication';
import { facebookAuthenticationCallback } from '../../../../services/auth/facebookAuthenticationCallback';
import { formBasedAuth } from '../../../../services/auth/formBasedAuthentication';
import { googleAuthentication } from '../../../../services/auth/googleAuthentication';
import { googleAuthenticationCallback } from '../../../../services/auth/googleAuthenticationCallback';
import { manageSessions } from '../../../../services/auth/manageSessions';
import {
  facebookAuthenticationCallbackController,
  googleAuthenticationCallbackController,
  loginFirebaseWithEmailUserNameOrAnonymouslyController,
  loginUsingBasicAuthentication,
  loginUsingJwtCookie,
  loginUsingJwtLocalStorage,
  loginUsingSessionId,
} from '../controllers/loginControllers';
import { verifyFirebaseToken } from '../../../../services/auth/verifyFirebaseToken';

export function createLoginRoutes(router: Router) {
  router.post(
    '/login-jwt-in-localStorage',
    formBasedAuth,
    loginUsingJwtLocalStorage,
  );

  router.post('/login-jwt-in-cookie', formBasedAuth, loginUsingJwtCookie);

  router.post(
    '/login-firebase-email-password-or-anonymously',
    verifyFirebaseToken,
    loginFirebaseWithEmailUserNameOrAnonymouslyController,
  );

  router.post('/login-sessionid', formBasedAuth, loginUsingSessionId);

  router.get(
    '/login-basic-authentication',
    basicAuthMiddleware,
    loginUsingBasicAuthentication,
  );

  router.get('/login-social-auth/google', manageSessions, googleAuthentication);
  router.get(
    '/login-social-auth/facebook',
    manageSessions,
    facebookAuthentication,
  );

  router.get(
    '/login-social-auth/google/callback',
    googleAuthenticationCallback,
    googleAuthenticationCallbackController,
  );
  router.get(
    '/login-social-auth/facebook/callback',
    facebookAuthenticationCallback,
    facebookAuthenticationCallbackController,
  );
}
