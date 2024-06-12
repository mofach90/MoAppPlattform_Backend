import { Router } from 'express';
import logger from '../../../config/logger';
import passport, { users } from '../../../config/passport-config';
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
import { removeSessionId, validSessionIds } from '../../../services/basic/validSessionIdFactory';

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
  router.get(
    '/social-auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
  );

  router.get(
    '/social-auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // Successful authentication, redirect home.
      logger.info('Successful authentication');
      logger.info('Callback req.user:', req.user);
      res.redirect('/');
    },
  );

  router.get('/social-auth/logout', (req, res, next) => {
    logger.info('User in req before logout:', req.user);
    const userId = req.user?.id; // Save the user ID before logout
    const sessionId = req.sessionID;
    logger.info(" *** Inside the Logout ***")
    logger.info(` userId : ${userId},   sessionId:   ${sessionId}`)
    logger.info(" ***********************")
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err)=>{
        if (err) {
          return next(err)
        }
        // res.clearCookie('connect.sid');
        logger.info('User in req after logout:', req.user);
        logger.info('before', { users });
        // Clear the in-memory user store for the current user
        const index = users.findIndex((user) => user.id === userId);
        if (index !== -1) {
          users.splice(index, 1);
        }
        logger.info('after', { users });
        removeSessionId(sessionId); // Invalidate the session ID
        res.redirect('/');
      })
    });
  });
  ;

  return router;
}
