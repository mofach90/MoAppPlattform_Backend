import { NextFunction, Router, Request, Response } from 'express';
import passport from 'passport';
import { jsonParser } from '../../services/basic/bodyParser';
import { corsMiddleware } from '../../services/basic/cors';
import { sanitizeMiddleware } from '../../services/basic/sanitize';
import { sessionFactory } from '../../services/basic/sessionFactory';
import { checkSessionSecretKey } from '../../services/utilities/checkSessionSecretKey';
import { addSessionId, validSessionIds } from '../../services/basic/validSessionIdFactory';
import { sessionValidator } from '../../services/auth/sessionValidator';
import logger from '../../config/logger';

export function registerMiddleware(router: Router): void {
  checkSessionSecretKey();
  router.use(sessionFactory);
  router.use((req:Request, res:Response, next:NextFunction) => {
    if (!validSessionIds.has(req.sessionID)) {
      addSessionId(req.sessionID);
    }
    logger.info('Current validSessionIds after add:', Array.from(validSessionIds));
    next();
  });
  router.use(sessionValidator)
  router.use(corsMiddleware);
  router.use(jsonParser);
  router.use(sanitizeMiddleware);
  router.use(passport.initialize());
  router.use(passport.session());
}
