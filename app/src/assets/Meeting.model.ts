export interface Meeting {
    id: string;
    title : string;
    agenda : string;
    notes : string;
    startTime : Date;
    endTime : Date;
    createdAt: Date;
    priority: "Low" | "Medium" | "High";

    owner?: string; // Who's contacting this lead (id)
    lead: string; // Which lead was this meeting created from (id)
    attendents : string[];

  };