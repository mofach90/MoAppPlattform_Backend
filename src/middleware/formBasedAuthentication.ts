import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();
const formBasedAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (await isSuccessfullyChecked(req)) {
      res.set("Content-Type", "application/json");
      res.status(200).send({ message: "Authentication Success" });
      return next();
    }
    res.status(401).send("False Credentials");
  } catch (error) {
    console.error("Error occur within from based authentication", error);
    res.status(500).send("Internal Server Failure");
  }
};

const isSuccessfullyChecked = async (req: Request) => {
  const { userName, password } = req.body;
  const storedUserName = process.env.USERNAME;
  const storedPassword = process.env.PASSWORD;
  if (!storedUserName || !storedPassword) {
    throw new Error("Envirenment username or password are not set !!");
  }
  return (
    userName === storedUserName &&
    (await bcrypt.compare(password, storedPassword))
  );
};

export { formBasedAuth };
