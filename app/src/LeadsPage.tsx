import axios from "axios";
import "./LeadsPage.scss";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const server = axios.create({
  baseURL: "http://localhost:5173",
});

interface Lead {
  id: string;
  createdAt: string;
  priority: "Low" | "Medium" | "High";
  stage:
    | "New"
    | "Acknowledged"
    | "Negotiation"
    | "Contract Sent"
    | "Customer"
    | "Closed";
  owner?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  jobTitle: string;
  companyName: string;
  sector: string;
  employeeCount?: number;
  address?: string;
}

export function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState<string>("");
  // const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await server.get(
          `http://localhost:3000/leads?search=${search}`
        );
        setLeads(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeads();
  }, [search]);

  return (
    <div>
      <h1>Browse Leads</h1>
      <menu  className="filter">
        <div>
          <label htmlFor="priority">Priority</label>
          <select name="priority" id="priority">
          <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="stage">Stage</label>
          <select name="stage" id="stage">
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="negotiation">Negotiation</option>
            <option value="contractSent">Contract Sent</option>
            <option value="customer">Customer</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </menu>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
      />
      <table className="leadsTable">
        <thead>
          <tr className="leadsTable__headers">
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Priority</th>
            <th>Stage</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="leadsTable__leadInfo">
              <td className="leadsTable__leadInfo__name">
                <a href={`leads/${lead.id}`}>
                  {lead.firstName} {lead.lastName}
                </a>
              </td>
              <td>{lead.email}</td>
              <td>{lead.phoneNumber}</td>
              <td>{lead.priority}</td>
              <td>{lead.stage}</td>
              <td>{lead.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
