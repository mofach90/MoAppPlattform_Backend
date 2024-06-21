import { NextFunction, Request, Response, Router } from 'express';
import logger from '../config/logger';
import { validSessions } from '../services/basic/validSessionFactory';
import { registerApiRoutes } from './components';
import { registerMiddleware } from './middleware';

export function initRestRoutes(router: Router): void {
  const prefix: string = '/api/v1';

  router.get(prefix, (req: Request, res: Response) => res.send('PING'));
  router.get('/', (req, res) => {
    logger.info('validSessions:', Array.from(validSessions)); // TODO delete in PRODUCTION
    res
      .status(200)
      .send(
        'Welcome to MoAppBackend, use the prefix api/v1 to use our api features ',
      );
  });
  router.use('*', (req: Request, res: Response, next: NextFunction) => {
    next();
  });
  registerMiddleware(router);
  registerApiRoutes(router, prefix);
}
