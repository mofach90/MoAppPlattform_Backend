import 'dotenv/config';
import logger from '../loggingFramework/logger';

export function checkSessionSecretKey() {
  if (!process.env.SESSION_SECRET_KEY) {
    logger.error('Secret key to sign the session ID cookie not defined');
    process.exit(1);
  }
}
