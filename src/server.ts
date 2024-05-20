import "dotenv/config";
import express from "express";
import bodyParser from "body-parser"
import { formBasedAuth } from "./middleware/formBasedAuthentication";

const app = express();
const port = process.env.PORT || (process.env.NODE_ENV === 'test' ? 4000 : 3000);

app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send("Welcome to MoAppBackend ");
});

app.use("/login", formBasedAuth)

app.get("/test",(_,res)=>{
  res.set('Content-Type','text/html')
  res.status(200).send("<h1>success status 200</h1>")
})

const server = app.listen(port, () => {
  console.log(`server running at http:\\localhost:${port}`);
});


export {app,server}