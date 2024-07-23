import { Request, Response } from 'express';

export const checkAuthSessionIdCookie = (req: Request, res: Response) => {
  console.log('req. session checkAuthSessionIdCookie: ', req.session);
  if (req.session.user) {
    res
      .status(200)
      .send({ message: 'Valid SessionId', isAuthenticatedSessionId: true });
  } else {
    res.status(401).send({
      message: 'SessionId not Valid',
      isAuthenticatedSessionId: false,
    });
  }
};
export const checkFirebaseAuthCookie = (req: Request, res: Response) => {
  console.log('req. session checkFirebaseAuthCookie: ', req.session);
  if (req.session.user) {
    res
      .status(200)
      .send({ message: 'Valid SessionId', isAuthenticatedFirebase: true });
  } else {
    res.status(401).send({
      message: 'SessionId not Valid',
      isAuthenticatedFirebase: false,
    });
  }
};

export const checkAuthJwtLocalStorage = (req: Request, res: Response) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  res
    .status(200)
    .send({ message: 'Valid Token', isAuthenticatedJwtLocalStorage: true });
};

export const checkAuthJwtCoookie = (req: Request, res: Response) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  res
    .status(200)
    .send({ message: 'Valid Token', isAuthenticatedJwtCookie: true });
};

export const checkBasicAuth = (req: Request, res: Response) => {
  res.status(200).send({
    message: 'Basic Authentication Valid Check ',
    isAuthenticatedBasic: true,
  });
};
