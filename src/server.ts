import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { formBasedAuth } from "./middleware/formBasedAuthentication";

const app = express();
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

app.post("/login",formBasedAuth, (req, res) => {
  console.log("Form-Based-Succeeded");
});

app.get("/test", (_, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>success status 200</h1>");
});

const server = app.listen(port, () => {
  console.log(`server running at http:\\localhost:${port}`);
});

export { app, server };
