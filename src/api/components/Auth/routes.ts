import { NextFunction, Router, Request, Response } from 'express';
import logger from '../../../config/logger';
import passport, { users } from '../../../config/passport-config';
import { basicAuthMiddleware } from '../../../services/auth/basicauth';
import { formBasedAuth } from '../../../services/auth/formBasedAuthentication';
import { verifyJwtFromCookie } from '../../../services/auth/verifyJwtFromCookie';
import { verifyJwtFromLocalStorage } from '../../../services/auth/verifyJwtFromLocalStorage';
import {
  addSessionId,
  clearAllSessionIds,
  removeSessionId,
  validSessionIds,
} from '../../../services/basic/validSessionIdFactory';
import {
  checkAuthJwtCoookie,
  checkAuthJwtLocalStorage,
  checkAuthSessionIdCookie,
  loginUsingBasicAuthentication,
  loginUsingJwtCookie,
  loginUsingJwtLocalStorage,
  loginUsingSessionId,
} from './controllers';
import { sessionValidator } from '../../../services/auth/sessionValidator';

export function createAuthRoutes(): Router {
  const router = Router();

  // Middleware to log req.user
  router.use((req, res, next) => {
    logger.info(`Middleware req.user: ${req.user}`);
    next();
  });


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

  router.get('/social-auth/google', (req, res, next) => {
    if (!req.sessionID) {
      return next(new Error('Session not initialized'));
    }
    logger.info(`Session ID before Google Auth: ${req.sessionID}`);
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  });


  router.get('/social-auth/google/callback', (req, res, next) => {
    logger.info(`Request Method during callback: ${req.method}`);
    logger.info(`Request URL during callback: ${req.url}`);
    logger.info(`Session ID at Google Callback start: ${req.sessionID}`);
    passport.authenticate('google', { failureRedirect: '/' }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.session.googleSessionId = req.sessionID
        if (req.session.googleSessionId && !validSessionIds.has(req.session.googleSessionId)) {
          logger.info('Middleware invoked: Adding session ID', {
            sessionId: req.session.googleSessionId,
          });
          addSessionId(req.session.googleSessionId);
          logger.info(
            'Current validSessionIds after add:',
            Array.from(validSessionIds),
          );
        }
        logger.info(`Session ID after Google Callback: ${req.sessionID}`);
        return res.redirect('/');
      });
    })(req, res, next);
  });



  router.get('/social-auth/logout', (req, res, next) => {
    logger.info(`User in req before logout: ${req.user}`);
    const userId = req.user?.id; // Save the user ID before logout
    const sessionId = req.sessionID;
    logger.info(' *** Inside the Logout ***');
    logger.info(` userId : ${userId},   sessionId:   ${sessionId}`);
    logger.info(' ***********************');
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        // res.clearCookie('connect.sid');
        logger.info(`User in req after logout: ${req.user}`);
        logger.info('before', { users });
        // Clear the in-memory user store for the current user
        const index = users.findIndex((user) => user.id === userId);
        if (index !== -1) {
          users.splice(index, 1);
        }
        logger.info('after', { users });
        removeSessionId(sessionId); // Invalidate the session ID
        res.redirect('/');
      });
    });
  });
  router.get('/clear', (req, res, next) => {
    clearAllSessionIds();
    res.redirect('/');
  });
  
  router.get('/check-if-user-auth-with-google',sessionValidator,(req:Request, res:Response, next:NextFunction)=>{
    logger.info(`your req.session.googlesessionid  is Valid : ${req.session.googleSessionId}`)
    res.redirect('/')
  })

  return router;
}
