import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { addSessionToDataBase } from '../basic/validSessionFactory';

export const googleAuthenticationCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
    if (err) {
      return res
        .status(403)
        .send({ message: `Google Authentication Failed error: ${err}` });
    }
    req.logIn(user, (err) => {
      const sessionId = req.session.id;
      const userId = req.session?.passport?.user;
      if (err) {
        return res
          .status(403)
          .send({ message: `Req.logIn Failed error: ${err}` });
      }
      if (sessionId && userId) {
        addSessionToDataBase(req.session.passport?.user, req.session.id);
        return next();
      }
    });
  })(req, res, next);
};
