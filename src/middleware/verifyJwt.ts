import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../loggingFramework/logger";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authRequest = req.headers.authorization;
  const token = authRequest?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }
  try {
    const decode: any = jwt.verify(token, process.env.JWT_SECRET || "");

    if (decode.user != process.env.USERNAME) {
      return res
        .status(401)
        .send({ message: "Invalid Token", isAuthenticatedJwt: false });
    }
    next();
  } catch (error) {
    if ((error as any).name === "TokenExpiredError") {
      return res
        .status(401)
        .send({ message: "Token has expired", isAuthenticatedJwt: false });
    }
    return res
      .status(401)
      .send({ message: "Invalid Token", isAuthenticatedJwt: false });
  }
};
