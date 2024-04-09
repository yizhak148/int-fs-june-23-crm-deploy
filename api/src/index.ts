import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { getConnection, initConnection } from "./dbConnection";
import { Lead } from "./Lead.model";

const app = express();

app.use(cors());
app.use(json());

app.get("/check", async (_, res) => {
  res.status(200);
  res.json({ status: "OK" });
});

app.post("/registerlead", async (req, res) => {
  try {
    const { id, createdAt, priority, stage, contactInfo, companyInfo } =
      req.body;

    const connection = getConnection();

    await connection.execute(
      `INSERT INTO leads (id, createdAt, priority, stage)
    VALUES (?, ?, ?, ?)`,
      [id, createdAt, priority, stage]
    );

    await connection.execute(
      `INSERT INTO contactInfo (leadId, firstName, lastName, phoneNumber, email, jobTitle)
    VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        contactInfo.firstName,
        contactInfo.lastName,
        contactInfo.phoneNumber,
        contactInfo.email,
        contactInfo.jobTitle,
      ]
    );

    await connection.execute(
      `INSERT INTO companyInfo (leadId, companyName, sector, employeeCount, address)
    VALUES (?, ?, ?, ?, ?)`,
      [
        id,
        companyInfo.companyName,
        companyInfo.sector,
        companyInfo.employeeCount,
        companyInfo.address,
      ]
    );

    res.status(201);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ error: "something went wrong" });
  }
});

app.get("/leads/:id", async (req, res) => {
  try {
    const connection = getConnection();

    const [details]: any[] = await connection.execute(
      `SELECT *
      FROM leads, contactInfo, companyInfo
      WHERE id = ?`,
      [req.params.id]
    );

    const leadDetails: Lead = {
      id: details[0].id,
      createdAt: details[0].createdAt,
      priority: details[0].priority,
      stage: details[0].stage,
      owner: details[0].owner,
      contactInfo: {
        firstName: details[0].firstName,
        lastName: details[0].lastName,
        phoneNumber: details[0].phoneNumber,
        email: details[0].email,
        jobTitle: details[0].jobTitle,
      },
      companyInfo: {
        companyName: details[0].companyName,
        sector: details[0].sector,
        employeeCount: details[0].employeeCount,
        address: details[0].address,
      },
    };

    res.status(200);
    res.json(leadDetails);
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
