import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import logger from '../../config/logger';
import { addSessionToDataBase } from '../basic/validSessionFactory';

export const facebookAuthenticationCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.debug('Start facebook Authentication callback ');
  passport.authenticate(
    'facebook',
    { failureRedirect: '/' },
    (err: any, user: any) => {
      logger.debug(' 1 ');

      if (err) {
        logger.debug(' 2 ');
        return res
          .status(403)
          .send({ message: `facebook Authentication Failed error: ${err}` });
      }
      logger.debug('User:', user);
      logger.debug(' 3 ');
      req.logIn(user, (err) => {
        const sessionId = req.session.id;
        console.log({ sessionId });
        const userId = req.session?.passport?.user;
        console.log({ userId });
        console.log('Session callback', req.session);
        logger.debug(' 4 ');
        if (err) {
          logger.debug(' 5 ');
          return res
            .status(403)
            .send({ message: `Req.logIn Failed error: ${err}` });
        }
        if (sessionId && userId) {
          logger.debug(' 6 ');
          addSessionToDataBase(req.session.passport?.user, req.session.id);
          return next();
        }
        logger.debug(' 7 ');
      });
    },
  )(req, res, next);
};
