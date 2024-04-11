import axios from "axios";
import "./LeadsPage.scss";

import { useState, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { VERCEL_URL } from "../lib/globals";
=======
import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";


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

export async function loader({ request }: LoaderFunctionArgs) {
  const { search } = new URL(request.url);
  const res = await axios.get(`http://localhost:3000/leads${search}`);


export function LeadsPage() {
  const leads = useLoaderData() as Lead[];

  return (
    <div>
      <h1>Browse Leads</h1>
      <menu className="filter">
        <Search />
        <Filter />
        <Link to={"/leads/registerlead"} className="newLeadLink">
          <button className="newLeadLink__button">New Lead</button>
        </Link>
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
                <Link to={`/leads/${lead.id}`}>
                  {lead.firstName} {lead.lastName}
                </Link>
              </td>
              <td>{lead.companyName}</td>
              <td>{lead.email}</td>
              <td>{lead.phoneNumber}</td>
              <td>{lead.priority}</td>
              <td>{lead.stage}</td>
              <td>
                {lead.createdAt?.replace("T", " at ").replace(".000Z", "")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <form>
      <label htmlFor="search">Search</label>
      <input
        className="filter__search"
        id="search"
        type="search"
        value={searchParams.get("search") ?? ""}
        onInput={(e) => {
          const nextSearchParams = new URLSearchParams(searchParams);

          nextSearchParams.set("search", e.currentTarget.value);

          setSearchParams(nextSearchParams, { replace: true });
        }}
      />
    </form>
  );
}

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <form>
      <label htmlFor="stage">Stage</label>
      <select
        name="stage"
        id="stage"
        onChange={(e) => {
          const nextSearchParams = new URLSearchParams(searchParams);

          nextSearchParams.set("stage", e.currentTarget.value);

          setSearchParams(nextSearchParams, { replace: true });
        }}
        value={searchParams.get("stage") ?? ""}
        className="filter__select"
      >
        <option value="">All</option>
        <option value="new">New</option>
        <option value="acknowledged">Acknowledged</option>
        <option value="negotiation">Negotiation</option>
        <option value="contract sent">Contract Sent</option>
        <option value="customer">Customer</option>
        <option value="closed">Closed</option>
      </select>
      <label htmlFor="priority">Priority</label>
      <select
        name="priority"
        id="priority"
        onChange={(e) => {
          const nextSearchParams = new URLSearchParams(searchParams);

          nextSearchParams.set("priority", e.currentTarget.value);

          setSearchParams(nextSearchParams, { replace: true });
        }}
        value={searchParams.get("priority") ?? ""}
        className="filter__select"
      >
        <option value="">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </form>
  );
}
