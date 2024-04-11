export interface Lead {
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