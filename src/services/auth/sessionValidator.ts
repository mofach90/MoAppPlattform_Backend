import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import { isValidSessionId } from '../basic/validSessionIdFactory';

function sessionValidator(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.sessionID;
  if (isValidSessionId(sessionId)) {
    return next();
  } else {
    req.logout((err) => {
      if (err) {
        next(err);
      }
      logger.info('Logout Successful because SessionId not more Valid');
    });
    res.status(401).send('Invalid session');
  }
}

export { sessionValidator };
