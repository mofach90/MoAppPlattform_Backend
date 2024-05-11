import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to MoAppBackend ");
});

app.listen(port, () => {
  console.log(`server running at http:\\localhost:${port}`);
});
