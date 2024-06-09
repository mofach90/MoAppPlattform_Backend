import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import logger from '../loggingFramework/logger';

dotenv.config();
const formBasedAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (await isSuccessfullyChecked(req)) {
      logger.info('Authentication successful', { userName: req.body.userName });
      res.set('Content-Type', 'application/json');
      return next();
    } else {
      logger.warn('Authentication failed', { userName: req.body.userName });
      res.status(401).send('False Credentials');
    }
  } catch (error) {
    logger.error('Error occured within form-based authentication', { error });
    res.status(500).send('Internal Server Failure');
  }
};

const isSuccessfullyChecked = async (req: Request) => {
  try {
    const { userName, password } = req.body;
    const storedUserName = process.env.USERNAME;
    const storedPassword = process.env.PASSWORD;
    if (!storedUserName || !storedPassword) {
      throw new Error('Envirenment username or password are not set !!');
    }
    const compareResult = await bcrypt.compare(password, storedPassword);
    if (!compareResult) {
      return false;
    }
    return userName === storedUserName && compareResult;
  } catch (error) {
    logger.error('Error occurred during password comparison', { error });
    throw new Error('Error occurred during authentication process');
  }
};

export { formBasedAuth };
