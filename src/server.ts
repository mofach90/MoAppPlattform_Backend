import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import sessions from "./express-session";
import logger from "./loggingFramework/logger";
import { formBasedAuth } from "./middleware/formBasedAuthentication";

const app = express();

if (!process.env.SESSION_SECRET_KEY) {
  logger.error("Secret key to sign the session ID cookie not defined");
  process.exit(1);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY || "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const port =
  process.env.PORT || (process.env.NODE_ENV === "test" ? 4000 : 3000);
const corsOptions = {
  origin: "http://localhost:3500",
  credential: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to MoAppBackend ");
});

app.post("/login", formBasedAuth, (req, res) => {
  req.session.regenerate(function (err) {
    if (err) {
      logger.error("Session regeneration failed", { error: err });
      return res.status(500).send("Internal Server Error");
    }
    req.session.user = req.body.user;
    
    req.session.save(function (err) {
      if (err) {
        logger.error("Session save failed", { error: err });
        return res.status(500).send("Internal Server Error");
      }
      res.status(200).json({ message: "Login successful", sessionID: req.sessionID });
    });
  });
  logger.info("Form-Based-Succeeded");
});

app.get("/test", (_, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>success status 200</h1>");
});

const server = app.listen(port, () => {
  console.log(`server running at http:\\localhost:${port}`);
});

export { app, server };
