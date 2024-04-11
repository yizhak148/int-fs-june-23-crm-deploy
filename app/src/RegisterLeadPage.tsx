import { FormEvent } from "react";
import "./RegisterLeadPage.scss";
import { Lead } from "./Lead.model";
import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3000",
});

export function RegisterLeadPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newLead: Lead = {
      id: crypto.randomUUID(),
      priority: "Low",
      stage: "New",
      contactInfo: {
        firstName: formData.get("firstName")!.toString(),
        lastName: formData.get("lastName")!.toString(),
        phoneNumber: formData.get("phoneNumber")!.toString(),
        email: formData.get("email")!.toString(),
        jobTitle: formData.get("jobTitle")!.toString(),
      },
      companyInfo: {
        companyName: formData.get("companyName")!.toString(),
        sector: formData.get("sector")!.toString(),
        employeeCount: Number(formData.get("employeeCount")),
        address: formData.get("address")?.toString(),
      },
    };

    try {
      await server.post("/leads/registerlead", newLead);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Register a new lead</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="registerForm__field">
          <label htmlFor="firstName">First Name: </label>
          <input type="text" name="firstName" id="firstName" required />
        </div>
        <div className="registerForm__field">
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" name="lastName" id="lastName" required />
        </div>
        <div className="registerForm__field">
          <label htmlFor="jobTitle">Job Title: </label>
          <input type="text" name="jobTitle" id="jobTitle" required />
        </div>
        <div className="registerForm__field">
          <label htmlFor="email">E-Mail: </label>
          <input type="text" name="email" id="email" required />
        </div>
        <div className="registerForm__field">
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input type="text" name="phoneNumber" id="phoneNumber" required />
        </div>
        <div className="registerForm__field">
          <label htmlFor="companyName">Company Name: </label>
          <input type="text" name="companyName" id="companyName" required />
        </div>
        <div className="registerForm__field">
          <label htmlFor="sector">Sector: </label>
          <input type="text" name="sector" id="sector" required />
        </div>
        <div className="registerForm__field">
          <label htmlFor="employeeCount">Number of Employees: </label>
          <input type="text" name="employeeCount" id="employeeCount" />
        </div>
        <div className="registerForm__field">
          <label htmlFor="address">Company Address: </label>
          <input type="text" name="address" id="address" />
        </div>
        <button className="registerForm__button">Submit</button>
      </form>
    </>
  );
}
