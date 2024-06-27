import { NextFunction, Request, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { auth } from '../../config/firebaseConfig';
import logger from '../../config/logger';



export const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idToken = req.body?.idToken ?? '';
  logger.info({ idToken });
  try {
    const decodedToken: DecodedIdToken= await auth.verifyIdToken(idToken);

    if (decodedToken) {
      logger.warn('decodedToken', decodedToken);
      req.user = {...decodedToken, id:decodedToken.uid};
      next();
    } else {
      throw new Error('Failed to Decode Token');
    }
  } catch (error) {
    logger.error(error)
  }
};
