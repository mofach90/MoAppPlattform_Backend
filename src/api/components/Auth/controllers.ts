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
  console.log("The req.session.user From Session Id :", req.session.user) // TODO delete
  if (req.session.user) {
    console.log("Valid SessionId message From Session Id :", req.session.user) // TODO delete
    res
    .status(200)
    .send({ message: 'Valid SessionId', isAuthenticatedSessionId: true });
  } else {
    console.log("not valid message From Session Id :", req.session.user) // TODO delete
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
    `req.session at the begin of loginUsingSessionId ${req.sessionID}`, //TODO delete
  );
  req.session.regenerate(function (err) {
    if (err) {
      logger.error('Session regeneration failed', { error: err });
      return res.status(500).send('Internal Server Error');
    }
    console.log("req.session.user before: ",req.session.user)
    console.log("req.body.userName: ",req.body.userName)
    req.session.user = req.body.userName;
    console.log("req.session.user after: ",req.session.user)
    req.session.save(function (err) {
      if (err) {
        logger.error('Session save failed', { error: err });
        return res.status(500).send('Internal Server Error');
      }
      console.log("After saving session:", req.session.user);
      res
        .status(200)
        .json({ message: 'Login successful', sessionID: req.sessionID });
    });
  });
  logger.info('Form-Based-Succeeded');
  logger.info(`req.session at the end of loginUsingSessionId ${req.sessionID}`);
  console.log("The req.session.user From loginUsingSessionId :", req.session.user) // TODO delete

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
  
  // res.status(200).send({ message: "Google Authentication Succeed" }).redirect("http://localhost:3500/"); //Uncommewnt when working with Frontend
  // res.redirect('/');
  res.redirect('http://localhost:3500/');
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
