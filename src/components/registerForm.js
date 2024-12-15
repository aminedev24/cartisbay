import React, { useState } from "react";
import CountryList from "./countryList";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsModalOpen })  => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  const handleCountryChange = (event) => {
    const country = CountryList().find((c) => c.label === event.target.value);
    setSelectedCountry(event.target.value);
    setPhoneCode(country ? country.countryCode : "");
  };

  const handleInputChange = (setter, event) => {
    setter(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!agreeToTerms) {
      setMessage("You must agree to the terms and conditions.");
      setIsError(true);
      return;
    }

    setMessage("Signing up...");
    setIsError(false);

    const formData = {
      "full-name": fullName,
      email,
      password,
      country: selectedCountry,
      phone,
      company,
    };

    try {
      const response = await fetch(`${apiUrl}/signup.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setMessage(result.error || "Signup failed. Try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="signup-container">
    <form className="signup-form" onSubmit={handleSignup}>
      {message && (
        <div className={`message ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <div className="input-group">
        <input
          type="text"
          value={fullName}
          onChange={(e) => handleInputChange(setFullName, e)}
          required
        />
        <label>Full Name</label>
      </div>

      <div className="input-group">
        <input
          type="email"
          value={email}
          onChange={(e) => handleInputChange(setEmail, e)}
          required
        />
        <label>Email</label>
      </div>

      <div className="input-group phone-number-group">
        {phoneCode && <span className="phone-code">{phoneCode}</span>}
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => handleInputChange(setPhone, e)}
          required
          placeholder="Phone Number"
          className={phoneCode ? "shrink" : ''}
        />
      </div>

      <div className="input-group">
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          name="country"
          className={selectedCountry ? "not-empty" : ""}
          required
        >
          <option value="">Select Country</option>
          {CountryList().sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
            <option key={country.code} value={country.label}>
              {country.label}
            </option>
          ))}
        </select>
      </div>



      <div className="input-group">
        <input
          type="text"
          value={company}
          onChange={(e) => handleInputChange(setCompany, e)}
        />
        <label>Company</label>
      </div>

      <div className="input-group">
        <input
          type="password"
          value={password}
          onChange={(e) => handleInputChange(setPassword, e)}
          required
        />
        <label>Password</label>
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="agree-to-terms"
          checked={agreeToTerms}
          required
          onChange={() => setAgreeToTerms(!agreeToTerms)}
        />
        <label htmlFor="agree-to-terms">
          I agree to the{" "}
          <span
            className="terms-highlight"
            onClick={() => setIsModalOpen(true)}
          >
            Terms and Conditions
          </span>
        </label>
      </div>

    

      <button type="submit">Sign Up</button>
    </form>
   
    </div>
  );
};

export default SignupForm;
