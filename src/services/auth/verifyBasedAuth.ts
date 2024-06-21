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
  console.log("Start verifyBasicAuth !!! ")
  const cookies = req.headers.cookie;
  console.log("cookie:  ",cookies)
  if (!cookies) {
    console.log("There is no cookie")
    return res.status(403).json({ message: 'No cookies found' });
  }
  const parsedCookies = cookie.parse(cookies);
  const authorization = parsedCookies['connect.sid'];
    if (!authorization) {
      console.log("There is no authorization")
      return res.status(403).json({ message: 'No authorization in cookies found' });
    }

  console.log('authorization from  verifyBasicAUth: ', authorization);
  const [userName, password] = decodeLoginData(authorization);
  console.log('usernsame from  verifyBasicAUth', userName);
  console.log('password from  verifyBasicAUth', password);
  const isLoginValid = checkLoginValidity(userName, password);
  console.log('message from  verifyBasicAUth : ', req.query.message);
  console.log('isLoginValid from  verifyBasicAUth  : ', isLoginValid);
  if (isLoginValid) {
    return next();
  } else {
    return res.status(401).json('Not Basic Auth');
  }
};

export { verifyBasicAuth };
