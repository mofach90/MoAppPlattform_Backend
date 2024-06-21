import cookie from 'cookie';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../../config/logger';

export interface DecodeType extends JwtPayload {
  user?: string;
}

export const verifyJwtFromCookie = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(403).send({ message: 'No cookies found' });
  }

  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies['connect.sid'];
  if (!token) {
    return res
      .status(403)
      .send({ message: 'A token is required for authentication' });
  }

  try {
    const decode: DecodeType | string = jwt.verify(
      token,
      process.env.JWT_SECRET ?? '',
    );
    if (typeof decode === 'string' || decode.user !== process.env.USERNAME) {
      return res
        .status(401)
        .send({ message: 'Invalid Token', isAuthenticatedJwt: false });
    }

    next();
  } catch (error) {
    logger.error(
      `JWT Error from Verify Jwt from Cookie: ${(error as any).message}`,
    );
    if ((error as any).name === 'TokenExpiredError') {
      logger.error('Token has expired');
      return res
        .status(401)
        .send({ message: 'Token has expired', isAuthenticatedJwt: false });
    }
    return res
      .status(401)
      .send({ message: 'Invalid Token', isAuthenticatedJwt: false });
  }
};
