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
  console.log('req.headers.authorization', req.headers.authorization);
  const [userName, password] = decodeLoginData(req.headers.authorization ?? '');
  console.log('usernsame', userName);
  console.log('password', password);
  const isLoginValid = checkLoginValidity(userName, password);
  console.log('message   : ', req.query.message);
  console.log('isLoginValid   : ', isLoginValid);
  console.log(
    'condition',
    !isLoginValid && req.query.message === 'Simple Basic Authentication',
  );
  if (isLoginValid) {
    return next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="/"');
    res.status(401).send('Require Authentication');
  }
};

export { basicAuthMiddleware };
