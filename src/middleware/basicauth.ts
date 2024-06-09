import base64 from 'base-64';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const decodeLoginData = (authHeader: string) => {
  const encodedCredentials = authHeader.trim().replace(/Basic\s+/i, '');
  const decodedCredentials = base64.decode(encodedCredentials);
  return decodedCredentials.split(':');
};

const checkLoginValidity = (userName: string, password: string) => {
  const userNameDummy = process.env.USERNAME;
  const passwordDummy = process.env.PASSWORD;
  if (userName == userNameDummy && password == passwordDummy) {
    return true;
  }
  return false;
};

const basicAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [userName, password] = decodeLoginData(req.headers.authorization ?? '');
  const isLoginValid = checkLoginValidity(userName, password);
  if (isLoginValid) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="/"');
  res.status(401).send('Require Authentication');
};

export { basicAuthMiddleware };
