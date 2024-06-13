import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import logger from '../../config/logger';
import { sessionValidator } from '../../services/auth/sessionValidator';
import { jsonParser } from '../../services/basic/bodyParser';
import { corsMiddleware } from '../../services/basic/cors';
import { sanitizeMiddleware } from '../../services/basic/sanitize';
import { sessionFactory, sessionLogger } from '../../services/basic/sessionFactory';
import {
  addSessionId,
  validSessionIds,
} from '../../services/basic/validSessionIdFactory';
import { checkSessionSecretKey } from '../../services/utilities/checkSessionSecretKey';
import { prefetchDetector } from '../../services/utilities/prefetchDetector';

export function registerMiddleware(router: Router): void {
  router.use(prefetchDetector);
  checkSessionSecretKey();
  router.use(sessionFactory);
  router.use(sessionLogger);  // Log session details

  // router.use((req: Request, res: Response, next: NextFunction) => {
  //   // Simplify logging statements
  //   logger.info(`Request Method: ${req.method}`);
  //   logger.info(`Request URL: ${req.url}`);
  //   logger.info(`Middleware invoked: Adding session ID ${req.sessionID}`);
  //   if (req.sessionID && !validSessionIds.has(req.sessionID)) {
  //     logger.info('Middleware invoked: Adding session ID', {
  //       sessionId: req.sessionID,
  //     });
  //     addSessionId(req.sessionID);
  //     logger.info(
  //       'Current validSessionIds after add:',
  //       Array.from(validSessionIds),
  //     );
  //   }
  //   next();
  // });
  router.use(corsMiddleware);
  router.use(jsonParser);
  router.use(sanitizeMiddleware);
  router.use(passport.initialize());
  router.use(passport.session());

}
