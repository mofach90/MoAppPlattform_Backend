import { Request, Response, Router } from 'express';
import { registerApiRoutes } from './components';
import { registerMiddleware } from './middleware';
import logger from '../config/logger';
import { validSessionIds } from '../services/basic/validSessionIdFactory';
import { sessionValidator } from '../services/auth/sessionValidator';

export function initRestRoutes(router: Router): void {
  const prefix: string = '/api/v1';

  router.get(prefix, (req: Request, res: Response) => res.send('PING'));
  router.get('/', (_, res) => {
    logger.info('validSessionIds:',  Array.from(validSessionIds));
    res
      .status(200)
      .send(
        'Welcome to MoAppBackend, use the prefix api/v1 to use our api features ',
      );
  });

  registerMiddleware(router);
  registerApiRoutes(router);

}
