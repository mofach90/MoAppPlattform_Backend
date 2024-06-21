import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import logger from '../../config/logger';

export const googleAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next,
  );
};
