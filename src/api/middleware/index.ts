import { Router } from 'express';
import passport from 'passport';
import { jsonParser } from '../../services/basic/bodyParser';
import { corsMiddleware } from '../../services/basic/cors';
import { sanitizeMiddleware } from '../../services/basic/sanitize';
import {
  sessionFactory,
  sessionLogger,
} from '../../services/basic/sessionFactory';
import { checkSessionSecretKey } from '../../services/utilities/checkSessionSecretKey';
import { prefetchDetector } from '../../services/utilities/prefetchDetector';

export function registerMiddleware(router: Router): void {
  router.use(prefetchDetector);
  checkSessionSecretKey();
  router.use(sessionFactory);
  router.use(sessionLogger); // Log session details only for Dev - TODO Delete
  router.use(corsMiddleware);
  router.use(jsonParser);
  router.use(sanitizeMiddleware);
  router.use(passport.initialize());
}
