import { Router } from 'express';
import { jsonParser } from '../../services/basic/bodyParser';
import { corsMiddleware } from '../../services/basic/cors';
import { sanitizeMiddleware } from '../../services/basic/sanitize';
import { sessionFactory } from '../../services/basic/sessionFactory';
import { checkSessionSecretKey } from '../../services/utilities/checkSessionSecretKey';

export function registerMiddleware(router: Router): void {
  checkSessionSecretKey();
  router.use(sessionFactory);
  router.use(corsMiddleware);
  router.use(jsonParser);
  router.use(sanitizeMiddleware);
}
