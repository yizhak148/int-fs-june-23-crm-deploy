import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { initConnection } from "./dbConnection";

const app = express();

app.use(cors());
app.use(json());

app.get("/check", async (_, res) => {
  res.status(200);
  res.json({ status: "OK" });
});

app.post("/registerLead", async (req, res) => {
  try {
    // add POST request code

    res.status(201);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ error: "something went wrong" });
  }
});

async function init() {
  await initConnection();
  app.listen(3000, () => console.log("Server running on localhost:3000"));
}

init();
