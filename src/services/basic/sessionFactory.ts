import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import logger from '../../config/logger';

const sessionFactory = session({
  secret: process.env.SESSION_SECRET_KEY ?? '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax', // helps against Cross-Site Request Forgery (CSRF) attacks
  },
  store: new session.MemoryStore(),
});

// Middleware to log session details
const sessionLogger = (req: Request, _: Response, next: NextFunction) => {
  logger.info(`Session ID: ${req.session.id}`);
  next();
};

export { sessionFactory, sessionLogger };
