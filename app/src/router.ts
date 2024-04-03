import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { RegisterLeadPage } from "./RegisterLeadPage";
import { LeadsPage } from "./LeadsPage"

export const router = createBrowserRouter([
    {
        index: true,
        Component: App
    },
    { path: "/registerLead",
    Component: RegisterLeadPage
    },
    { path: "/leads",
    Component: LeadsPage
}
]);