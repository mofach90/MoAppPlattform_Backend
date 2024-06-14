import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import logger from '../../config/logger';
import { addSessionToDataBase, removeSessionFromDataBase } from '../basic/validSessionFactory';
import { users } from '../../config/passport-config';

export const logoutMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.session?.passport?.user ?? '';
  console.log({userId})
  const sessionId = req.sessionID;
  console.log({sessionId})
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      const index = users.findIndex((user) => user.id === userId);
      if (index !== -1) {
        users.splice(index, 1);
      }
      removeSessionFromDataBase(userId);

    });
    next()
  });
};