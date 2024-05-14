import base64 from "base-64";
import { NextFunction, Request, Response } from "express";

const decodeLoginData = (authHeader: string) => {
  const encodedCredentials = authHeader.trim().replace(/Basic\s+/i, "");
  const decodedCredentials = base64.decode(encodedCredentials);
  return decodedCredentials.split(":");
};

const checkLoginValidity = (userName: string, password: string) => {
  const userNameDummy = "admin";
  const passwordDummy = "admin";
  if (userName == userNameDummy && password == passwordDummy) {
    return true;
  }
  return false;
};

const basicAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [userName, password] = decodeLoginData(req.headers.authorization || "");
  const isLoginValid = checkLoginValidity(userName, password);
  console.log("req", req.headers);
  if (isLoginValid) {
    return next();
  }
  
  res.set("WWW-Authenticate", 'Basic realm="/"');
  res.status(401).send("Require Authentication");
  console.log("res._header:", (res as any)._header);};

export { basicAuthMiddleware };
