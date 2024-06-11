import { Router } from 'express';
import { jsonParser } from '../../middleware/bodyParser';
import { corsMiddleware } from '../../middleware/cors';
import { sanitizeMiddleware } from '../../middleware/sanitize';
import { sessionFactory } from '../../middleware/sessionFactory';
import { checkSessionSecretKey } from '../../utilities/checkSessionSecretKey';

export function registerMiddleware(router: Router): void {
  checkSessionSecretKey();
  router.use(sessionFactory);
  router.use(corsMiddleware);
  router.use(jsonParser);
  router.use(sanitizeMiddleware);
}
