import base64 from 'base-64';
import cookie from 'cookie';
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

const verifyBasicAuth = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(403).json({ message: 'No cookies found' });
  }
  const parsedCookies = cookie.parse(cookies);
  const authorization = parsedCookies['connect.sid'];
  if (!authorization) {
    return res
      .status(403)
      .json({ message: 'No authorization in cookies found' });
  }

  const [userName, password] = decodeLoginData(authorization);
  const isLoginValid = checkLoginValidity(userName, password);
  if (isLoginValid) {
    return next();
  } else {
    return res.status(401).json('Not Basic Auth');
  }
};

export { verifyBasicAuth };
