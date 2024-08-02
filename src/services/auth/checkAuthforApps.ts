import { NextFunction, Request, Response } from 'express';

export const checkAuthforApps = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('req. session checkFirebaseAuthCookie for Apps: ', req.session);
  if (req.session.user) {
    next();
  } else {
    res.status(401).send({
      message: 'SessionId not Valid',
      isAuthenticatedFirebase: false,
    });
  }
};
