import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { initConnection } from "./dbConnection";
import { router as leadsRouter } from "./leads.router";

const app = express();

app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use("/leads", leadsRouter);

app.get("/", async (_, res) => {
  
  res.status(200).send("hello world!!!!!!!")
  //res.json({ status: "OK" });
});

app.get("/check", async (_, res) => {
  res.status(200);
  res.json({ status: "OK" });
});

async function init() {
  await initConnection();
  app.listen(3000, () => console.log("Server running on localhost:3000"));
}

init();

module.exports = app