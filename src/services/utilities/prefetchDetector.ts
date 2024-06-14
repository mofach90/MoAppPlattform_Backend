import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';

export function prefetchDetector(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    req.headers['purpose'] === 'prefetch' ||
    req.headers['x-purpose'] === 'prefetch'
  ) {
    logger.warn(' A Prefetch was detected and cleaned ');
    res.status(204).end(); // No Content
  } else {
    next();
  }
}
