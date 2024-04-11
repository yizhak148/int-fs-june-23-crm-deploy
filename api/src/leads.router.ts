import { Router } from "express";
import { getConnection } from "./dbConnection";
import { Lead } from "./Lead.model";

export const router = Router();

router.get("/", async (req, res) => {
  try {
    const connection = getConnection();
    const search = req.query.search ? String(req.query.search) : "";
    const priority = req.query.priority ? String(req.query.priority) : "";
    const stage = req.query.stage ? String(req.query.stage) : "";

    let sqlQuery = `
        SELECT *
        FROM contactInfo
        JOIN leads ON contactInfo.leadId = leads.id
        JOIN companyInfo ON leads.id = companyInfo.leadId
        WHERE (firstName LIKE ? OR lastName LIKE ? OR email LIKE ?)
        AND (priority = ? OR ? = '')
        AND (stage = ? OR ? = '')
      `;

    const [result] = await connection.execute(sqlQuery, [
      `${search}%`,
      `${search}%`,
      `${search}%`,
      priority,
      priority,
      stage,
      stage,
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "couldn't find leads..." });
  }
});

router.post("/registerlead", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  try {
    const connection = getConnection();

    const [details]: any[] = await connection.execute(
      `SELECT *
      FROM leads
      JOIN contactInfo ON leads.id = contactInfo.leadId
      JOIN companyInfo ON leads.id = companyInfo.leadId
      WHERE id = ?`,
      [req.params.id]
    );

    const [lead] = details;

    const leadDetails: Lead = {
      id: lead.id,
      createdAt: lead.createdAt,
      priority: lead.priority,
      stage: lead.stage,
      owner: lead.owner,
      contactInfo: {
        firstName: lead.firstName,
        lastName: lead.lastName,
        phoneNumber: lead.phoneNumber,
        email: lead.email,
        jobTitle: lead.jobTitle,
      },
      companyInfo: {
        companyName: lead.companyName,
        sector: lead.sector,
        employeeCount: lead.employeeCount,
        address: lead.address,
      },
    };

    res.status(200);
    res.json(leadDetails);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ error: "Couldn't get lead details" });
  }
});
