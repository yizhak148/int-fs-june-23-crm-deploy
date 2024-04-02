export interface Lead {
  id: string;
  createdAt: Date;
  priority: "Low" | "Medium" | "High";
  stage:
    | "New"
    | "Acknowledged"
    | "Negotiation"
    | "Contract Sent"
    | "Won"
    | "Closed";
  owner?: string; // Who's contacting this lead (id)
  contactInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    jobTitle: string;
  };
  companyInfo: {
    companyName: string;
    sector: string;
    employeeCount?: number;
    address?: string;
  };
};