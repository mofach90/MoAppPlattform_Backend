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
  console.log("This is the base url from manageSession",req.headers.referer)
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
    console.log("this is the req.headers",req.headers)
    console.log(res.header)
    next();
  }
}
