import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { RegisterLeadPage } from "./RegisterLeadPage";

export const router = createBrowserRouter([
    {
        index: true,
        Component: App
    },
    { path: "/registerLead",
    Component: RegisterLeadPage
}
]);