import "./RegisterLeadPage.scss";

export function RegisterLeadPage() {
  return (
    <>
      <h1>Interested in our services?</h1>
      <p>Fill your information and we'll contact you as soon as possible</p>
      <form className="registerForm" action="">
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
