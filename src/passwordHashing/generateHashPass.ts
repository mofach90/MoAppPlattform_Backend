import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import logger from '../loggingFramework/logger';

//this script generate your hashed passord , change yourPassword , run the script then store -
// the hashed value returned in the console in your .env file as PASSWORD
dotenv.config();
const yourPassword = process.env.PASSWORD_TO_HASH || '';
const hashPassword = async (yourPassword: string) => {
  try {
    const yourHashedPassword = await bcrypt.hash(yourPassword, 10);
    logger.info({ yourHashedPassword });
  } catch (error) {
    logger.error('Errror when hashing the password', error);
  }
};
hashPassword(yourPassword);
