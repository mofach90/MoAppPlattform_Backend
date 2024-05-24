import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
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
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax", // helps against Cross-Site Request Forgery (CSRF) attacks
    },
  })
);

const port =
  process.env.PORT || (process.env.NODE_ENV === "test" ? 4000 : 3000);
const corsOptions = {
  origin: "http://localhost:3500",
  credentials: true, // Allow credentials (cookies)
  optionsSuccessStatus: 200, // option is used to ensure that a 200 status code is returned for preflight requests (an OPTIONS request sent to the server before the actual request, to check if the actual request is safe to send)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send("Welcome to MoAppBackend ");
});

app.post("/login", formBasedAuth, (req, res) => {
  // help against forms of session fixation
  req.session.regenerate(function (err) {
    if (err) {
      logger.error("Session regeneration failed", { error: err });
      return res.status(500).send("Internal Server Error");
    }
    req.session.user = req.body.userName;
    req.session.save(function (err) {
      if (err) {
        logger.error("Session save failed", { error: err });
        return res.status(500).send("Internal Server Error");
      }
      res
        .status(200)
        .json({ message: "Login successful", sessionID: req.sessionID });
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
