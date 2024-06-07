import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../loggingFramework/logger";
import { decodeType } from "./verifyJwtFromCookie";

export const verifyJwtFromLocalStorage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authRequest = req.headers.authorization;
  const token = authRequest?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }
  try {
    const decode: decodeType | string = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    );
    if (typeof decode === "string" || decode.user !== process.env.USERNAME) {
      return res
        .status(401)
        .send({ message: "Invalid Token", isAuthenticatedJwt: false });
    }
    next();
  } catch (error) {
    logger.error(`JWT Error: ${(error as any).message}`);
    if ((error as any).name === "TokenExpiredError") {
      logger.error("Token has expired");

      return res
        .status(401)
        .send({ message: "Token has expired", isAuthenticatedJwt: false });
    }
    return res
      .status(401)
      .send({ message: "Invalid Token", isAuthenticatedJwt: false });
  }
};
