import "dotenv/config";
import express from "express";
import {basicAuthMiddleware} from './middleware/basicauth'
const app = express();
const port = process.env.PORT || (process.env.NODE_ENV === "test" ? 4000 : 3000);

app.use("/basicauthentication",basicAuthMiddleware);

app.get("/", (_, res) => {
  res.status(200).send("Welcome to MoAppBackend ");
});
app.get("/basicauthentication", (_, res) => {
  res.status(200).send("Welcome to MoAppBackend - Basic Authentication ");
});

app.get("/test", (_, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>success status 200</h1>");
});

const server = app.listen(port, () => {
  console.log(`server running at http:\\localhost:${port}`);
});

export { app, server };
