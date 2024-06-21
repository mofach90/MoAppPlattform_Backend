import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import logger from '../../config/logger';

export const facebookAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
};
