import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import {
  isValidSession,
  purgeSessionDataBase,
  removeSessionFromDataBase,
} from '../basic/validSessionFactory';

export function manageSessions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sessionId = req.session.id;
  const userId = req.session?.passport?.user;
  if (userId) {
    if (isValidSession(userId, sessionId)) {
      logger.info(' Your Session Still Valid , No need to Authenticate again ');
      // res.status(200).send('SessionId Still Valid');
      res.redirect('/');
    } else {
      logger.error('Session not valid');
      removeSessionFromDataBase(userId);
      return next();
    }
  } else {
    purgeSessionDataBase(sessionId);
    logger.error(
      'There is no SessionId Found You need to first Authenticate ---> to Login ',
    );
    next();
  }
}
