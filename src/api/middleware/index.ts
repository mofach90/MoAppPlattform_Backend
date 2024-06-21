import cors from 'cors';
import { Router } from 'express';
import passport from 'passport';
import { jsonParser } from '../../services/basic/bodyParser';
import { corsMiddleware } from '../../services/basic/cors';
import { sanitizeMiddleware } from '../../services/basic/sanitize';
import { sessionFactory } from '../../services/basic/sessionFactory';
import { checkSessionSecretKey } from '../../services/utilities/checkSessionSecretKey';
import { prefetchDetector } from '../../services/utilities/prefetchDetector';

export function registerMiddleware(router: Router): void {
  router.use(prefetchDetector);
  checkSessionSecretKey();
  router.use(sessionFactory);
  router.use(
    cors({
      origin: 'http://localhost:3500',
      credentials: true,
      optionsSuccessStatus: 200,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
    }),
  );
  router.options('*', corsMiddleware);
  router.use(jsonParser);
  router.use(sanitizeMiddleware);
  router.use(passport.initialize());
  router.use(passport.session());
}
