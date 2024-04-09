import "./RegisterLeadPage.scss";
import { Lead } from "./Lead.model";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const server = axios.create({
  baseURL: "http://localhost:3000",
});

export function LeadDetailsPage() {
  const { id } = useParams();
  const [leadDetails, setLeadDetails] = useState<Lead | null>(null);

  useEffect(() => {
    async function getDetails() {
      try {
        const res = await server.get<Lead>(`http://localhost:3000/leads/${id}`);
        setLeadDetails(res.data);
      } catch (error) {
        console.error("Error fetching lead details:", error);
      }
    }

    getDetails();
  }, [id]);

  if (!leadDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{leadDetails.companyInfo.companyName}</h1>
      <h2>sector: {leadDetails.companyInfo.sector}</h2>
      <ul>
        <li>Creation Date: {leadDetails.createdAt.split("T")[0]}</li>
        <li>Priority: {leadDetails.priority}</li>
        <li>Stage: {leadDetails.stage}</li>
        <li>Owner: {leadDetails.owner ? leadDetails.owner : "NO OWNER"}</li>
      </ul>
      <h3>Contact Info</h3>
      <ul>
        <li>
          Full Name: {leadDetails.contactInfo.firstName}{" "}
          {leadDetails.contactInfo.lastName}
        </li>
        <li>Title: {leadDetails.contactInfo.jobTitle}</li>
        <li>Phone: {leadDetails.contactInfo.phoneNumber}</li>
        <li>Email: {leadDetails.contactInfo.email}</li>
      </ul>
    </>
  );
}
