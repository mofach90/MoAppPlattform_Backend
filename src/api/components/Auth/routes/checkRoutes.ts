import { Router } from 'express';
import { manageSessions } from '../../../../services/auth/manageSessions';
import { verifyBasicAuth } from '../../../../services/auth/verifyBasedAuth';
import { verifyJwtFromCookie } from '../../../../services/auth/verifyJwtFromCookie';
import { verifyJwtFromLocalStorage } from '../../../../services/auth/verifyJwtFromLocalStorage';
import {
  checkAuthJwtCoookie,
  checkAuthJwtLocalStorage,
  checkAuthSessionIdCookie,
  checkBasicAuth,
} from '../controllers/checkControllers';

export function createCheckRoutes(router: Router) {
  router.get('/check-session-id-cookie', checkAuthSessionIdCookie);
  router.get('/check-firebase-authentication', checkAuthSessionIdCookie);
  router.get(
    '/check-jwt-local-storage',
    verifyJwtFromLocalStorage,
    checkAuthJwtLocalStorage,
  );
  router.get('/check-jwt-cookie', verifyJwtFromCookie, checkAuthJwtCoookie);
  router.get('/check-basic-authentication', verifyBasicAuth, checkBasicAuth);
  router.get('/check-google-auth', manageSessions, (req, res, next) => {
    res.status(403).send('in GOOGLE NOT AUTH ');
  });
}
