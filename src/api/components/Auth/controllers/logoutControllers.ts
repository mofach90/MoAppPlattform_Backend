import { NextFunction, Request, Response } from 'express';
import { clearAllSessionsFromDataBase } from '../../../../services/basic/validSessionFactory';

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie('connect.sid');
  res.status(200).json({ message: 'Logout Succeed' });
};

export const clearController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  clearAllSessionsFromDataBase;
  res.redirect('/');
};
