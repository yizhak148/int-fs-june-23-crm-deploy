import "./LeadDetailsPage.scss";
import { Lead } from "./Lead.model";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { VERCEL_URL } from "../lib/globals";

export function LeadDetailsPage() {
  const { id } = useParams();
  const [leadDetails, setLeadDetails] = useState<Lead | null>(null);

  useEffect(() => {
    async function getDetails() {
      try {
        const res = await axios.get<Lead>(`${VERCEL_URL}leads/${id}`);
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
      <div className="title">
        <h1>{leadDetails.companyInfo.companyName}</h1>
        <h2>sector: {leadDetails.companyInfo.sector}</h2>
      </div>
      <div className="detailsContainer">
        <ul>
          <li>ID: {leadDetails.id}</li>
          <li>Created at {leadDetails.createdAt.split("T")[0]}</li>
          <li>{leadDetails.priority} Priority</li>
          <li>{leadDetails.stage}</li>
          <li>{leadDetails.owner ? leadDetails.owner : "NO OWNER"}</li>
        </ul>
        <ul>
          <li>
            Full Name: {leadDetails.contactInfo.firstName}{" "}
            {leadDetails.contactInfo.lastName}
          </li>
          <li>Title: {leadDetails.contactInfo.jobTitle}</li>
          <li>Phone: {leadDetails.contactInfo.phoneNumber}</li>
          <li>Email: {leadDetails.contactInfo.email}</li>
        </ul>
      </div>
    </>
  );
}
