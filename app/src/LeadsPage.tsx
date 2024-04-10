import axios from "axios";
import "./LeadsPage.scss";
import { useState, useEffect, PropsWithChildren } from "react";

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
  const [priority, setPriority] = useState<string>("");
  const [stage, setStage] = useState<string>("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await server.get(
          `http://localhost:3000/leads?search=${search}${
            priority ? `&priority=${priority}` : ""
          }${stage ? `&stage=${stage}` : ""}`
        );
        setLeads(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeads();
  }, [search, priority, stage]);

  return (
    <div>
      <h1>Browse Leads</h1>
      <menu className="filter">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className="filter__search"
        />
        <Select filterCategory="priority" onChange={setPriority} value={priority}>
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <Select filterCategory="stage" onChange={setStage}>
          <option value="">All</option>
          <option value="new">New</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="negotiation">Negotiation</option>
          <option value="contract sent">Contract Sent</option>
          <option value="customer">Customer</option>
          <option value="closed">Closed</option>
        </Select>
      </menu>
      <table className="leadsTable">
        <thead>
          <tr className="leadsTable__headers">
            <th>Name</th>
            <th>Company</th>
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
              <td>{lead.companyName}</td>
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

type FilterCategory = "stage" | "priority";

type SelectProps = {
  filterCategory: FilterCategory;
  onChange: (value: string) => void;
  value: string;
};

function Select({
  filterCategory,
  value,
  onChange,
  children,
}: PropsWithChildren<SelectProps>) {
  return (
    <div>
      <label htmlFor={filterCategory} className="filter__label">
        {filterCategory}
      </label>
      <select
        name={filterCategory}
        id={filterCategory}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="filter__select"
      >
        {children}
      </select>
    </div>
  );
}
