import { Request, Response } from 'express';
import logger from '../../../../config/logger';
import { tokenGenerator } from '../../../../services/utilities/generateToken';

declare module 'express-session' {
  interface Session {
    user: string;
    passport: { user: string };
  }
}

export const loginUsingJwtLocalStorage = (req: Request, res: Response) => {
  const token = tokenGenerator(req.body.userName);
  res.setHeader('Authorization', `Bearer ${token}`);
  res.status(200).json({ message: 'login successful', token });
  logger.info('JWT Based Authentication Succeeded');
};

export const loginUsingJwtCookie = (req: Request, res: Response) => {
  const token = tokenGenerator(req.body.userName);
  res.cookie('connect.sid', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'login successful', token });
  logger.info('JWT Based Authentication Succeeded');
};

export const loginUsingSessionId = (req: Request, res: Response) => {
  // helps against forms of session fixation
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
};

export const loginUsingBasicAuthentication = (req: Request, res: Response) => {
  res.cookie('connect.sid', req.headers.authorization);
  res.status(200).send({
    message: 'Basic Authentication Succeed ',
  });
};

export const googleAuthenticationCallbackController = (
  req: Request,
  res: Response,
) => {
  res.redirect('http://localhost:3500/dashboard');
};

export const facebookAuthenticationCallbackController = (
  req: Request,
  res: Response,
) => {
  res.redirect('http://localhost:3500/dashboard');
};