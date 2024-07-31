import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';

dotenv.config();
const formBasedAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (await isSuccessfullyChecked(req)) {
      logger.info('Authentication successful');
      return next();
    } else {
      logger.warn('Authentication failed');
      res.status(401).send('False Credentials');
    }
  } catch (error) {
    logger.error('Error occured within form-based authentication');
    res.status(500).send('Internal Server Failure');
  }
};

const isSuccessfullyChecked = async (req: Request) => {
  try {
    console.log('req.body', req.body);
    const { emailAdress, password } = req.body;
    const storedemailAdress = process.env.EMAIL_ADRESS ?? '';
    const storedPassword = process.env.PASSWORD ?? '';
    console.log({ storedemailAdress });
    console.log({ emailAdress });
    console.log({ password });
    if (!storedemailAdress || !storedPassword) {
      throw new Error('Envirenment emailAdress or password are not set !!');
    }
    const compareResult = await bcrypt.compare(password, storedPassword);
    console.log({ compareResult });
    if (!compareResult) {
      return false;
    }
    console.log(
      'compare result',
      emailAdress === storedemailAdress && compareResult,
    );
    return emailAdress === storedemailAdress && compareResult;
  } catch (error) {
    logger.error('Error occurred during password comparison', { error });
    throw new Error('Error occurred during authentication process');
  }
};

export { formBasedAuth };
