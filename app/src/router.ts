import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { RegisterLeadPage } from "./RegisterLeadPage";
import { LeadsPage } from "./LeadsPage";
import { LeadDetailsPage, loader as leadLoader } from "./LeadDetailsPage";

export const router = createBrowserRouter([
  {
    index: true,
    Component: App,
  },
  { path: "/leads", Component: LeadsPage },
  { path: "/leads/registerLead", Component: RegisterLeadPage },
  {
    path: "/leads/:id",
    Component: LeadDetailsPage,
    loader: leadLoader
  },
]);