import { NextFunction, Request, Response } from 'express';
import logger from '../../../config/logger';
import { clearAllSessionsFromDataBase } from '../../../services/basic/validSessionFactory';
import { tokenGenerator } from '../../../services/utilities/generateToken';

declare module 'express-session' {
  interface Session {
    user: string;
    passport: { user: string };
  }
}

export const checkAuthSessionIdCookie = (req: Request, res: Response) => {
  if (req.session.user) {
    res
      .status(200)
      .send({ message: 'Valid SessionId', isAuthenticatedSessionId: true });
  } else {
    res.status(401).send({
      message: 'SessionId not Valid',
      isAuthenticatedSessionId: false,
    });
  }
};
export const checkAuthJwtLocalStorage = (req: Request, res: Response) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  res
    .status(200)
    .send({ message: 'Valid Token', isAuthenticatedJwtLocalStorage: true });
};
export const checkAuthJwtCoookie = (req: Request, res: Response) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  res
    .status(200)
    .send({ message: 'Valid Token', isAuthenticatedJwtCookie: true });
};
export const loginUsingJwtLocalStorage = (req: Request, res: Response) => {
  const token = tokenGenerator(req.body.userName);
  res.setHeader('Authorization', `Bearer ${token}`);
  res.status(200).json({ message: 'login successful', token });
  logger.info('JWT Based Authentication Succeeded');
};
export const loginUsingJwtCookie = (req: Request, res: Response) => {
  const token = tokenGenerator(req.body.userName);
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'login successful', token });
  logger.info('JWT Based Authentication Succeeded');
};
export const loginUsingSessionId = (req: Request, res: Response) => {
  // helps against forms of session fixation
  logger.info(
    `req.session at the begin of loginUsingSessionId ${req.sessionID}`,
  );
  req.session.regenerate(function (err) {
    if (err) {
      logger.error('Session regeneration failed', { error: err });
      return res.status(500).send('Internal Server Error');
    }
    req.session.user = req.body.userName;
    req.session.save(function (err) {
      if (err) {
        logger.error('Session save failed', { error: err });
        return res.status(500).send('Internal Server Error');
      }
      res
        .status(200)
        .json({ message: 'Login successful', sessionID: req.sessionID });
    });
  });
  logger.info('Form-Based-Succeeded');
  logger.info(`req.session at the end of loginUsingSessionId ${req.sessionID}`);
};
export const loginUsingBasicAuthentication = (req: Request, res: Response) => {
  res.status(200).send({
    message: 'Basic Authentication Succeed ',
    isAuthenticatedBasic: true,
  });
};

export const googleAuthenticationCallbackController = (
  req: Request,
  res: Response,
) => {
  // res.status(200).send({ message: "Google Authentication Succeed" }); //Uncommewnt when working with Frontend
  res.redirect('/');
};
export const logoutController = (req: Request, res: Response) => {
  // res.status(200).send({ message: "Google Authentication Succeed" }); //Uncommewnt when working with Frontend
  // res.redirect('https://accounts.google.com/logout');  // TODO only for Dev - Delete
  res.clearCookie('connect.sid');

  res.redirect('/');
};

export const clearController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  clearAllSessionsFromDataBase;
  res.redirect('/');
};
