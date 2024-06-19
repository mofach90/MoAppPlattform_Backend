import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import logger from '../../config/logger';

export const googleAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.debug('Start GOOGLE Authentication ');
  // res.header(
  //   'Access-Control-Allow-Origin',
  //   'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fv1%2Fauth%2Fsocial-auth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=892206661639-sucrgrk582sjdbfl4hq3h10mngdenpnu.apps.googleusercontent.com',
  // );
  // res.header('Access-Control-Allow-Credentials', 'true');
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next,
  );

  // console.log('response ', res);
  logger.info(
    'end of googleAuthentication --> go to /social-auth/google/callback',
  );
};
