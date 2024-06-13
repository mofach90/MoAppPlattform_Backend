import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import { isValidSessionId } from '../basic/validSessionIdFactory';

function sessionValidator(req: Request, res: Response, next: NextFunction) {
  logger.error("Teeeeeeeeesssssssssssssttttttttttttt") //TODO delete
  const sessionId = req.session.googleSessionId;
  logger.info(`Validating session: ${sessionId}`);
  logger.info(`req.session.googleSessionId: ${req.session.googleSessionId}`);
  console.log( sessionId)
  
  if (sessionId) {
    logger.info('inside if');
    if (isValidSessionId(sessionId)) {
      logger.info('inside second if');

      return next();
    } else {
      logger.info('alse');

      req.logout((err) => {
        if (err) {
          next(err);
        }
        logger.info('Logout Successful because SessionId not more Valid');
      });
      res.status(401).send('Invalid session');
    }
    
  }else {
    logger.error("You need to first Authenticate using the google auth HAHAHAHA !!!!")
    res.redirect('/auth/social-auth/google')
  }

  // logger.info({req});
}

export { sessionValidator };
