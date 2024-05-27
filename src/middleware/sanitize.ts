import { Request, Response, NextFunction } from "express";
import validator from "validator";

const sanitizeMiddleware = (req: Request, _: Response, next: NextFunction) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = validator.escape(req.body[key]);
      }
    }
  }
  next();
};

export { sanitizeMiddleware };