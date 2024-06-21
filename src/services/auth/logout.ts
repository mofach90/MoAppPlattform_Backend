import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import { users } from '../../config/passport-config';
import { removeSessionFromDataBase } from '../basic/validSessionFactory';

export const logoutMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.session?.passport?.user ?? '';
  req.logout((err) => {
    if (err) {
      logger.error('logout failed', { error: err });
      return res
        .status(500)
        .send({ message: 'Internal Server Error during logout', error: err });
    }
    req.session.destroy((err) => {
      if (err) {
        logger.error('session destruction failed', { error: err });
        return res.status(500).send({
          message: 'Internal Server Error during session destruction',
          error: err.message,
        });
      }
      const index = users.findIndex((user) => user.id === userId);
      if (index !== -1) {
        users.splice(index, 1);
      }
      removeSessionFromDataBase(userId);
    });
    next();
  });
};
