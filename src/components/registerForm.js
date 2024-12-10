import React, { useState } from "react";
import CountryFlag from "react-country-flag";
import CountryList from './countryList';

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const handleCountryChange = (event) => {
    const country = CountryList().find((c) => c.label === event.target.value);
    setSelectedCountry(event.target.value);
    setPhoneCode(country ? country.countryCode : "");
  };

  const handleInputChange = (setter, event) => {
    setter(event.target.value);
    if (event.target.value) {
      event.target.classList.add("not-empty");
    } else {
      event.target.classList.remove("not-empty");
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const formattedPhone = `${phoneCode} ${phone}`.trim();
    
    const formData = {
      'full-name': fullName,
      email,
      password,
      country: selectedCountry,
      phone: formattedPhone,
      company
    };

    try {
      const response = await fetch('server/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      const resultText = await response.text();
      let result;
      try {
        result = JSON.parse(resultText);
      } catch (error) {
        console.error('Response is not valid JSON:', resultText);
        return;
      }

      if (result.success) {
        console.log(result.success);
      } else if (result.errors) {
        result.errors.forEach(error => console.error(error));
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <div className="input-group">
        <input
          name="full-name"
          type="text"
          id="full-name"
          value={fullName}
          onChange={(e) => handleInputChange(setFullName, e)}
          required
        />
        <label htmlFor="full-name">Full Name</label>
      </div>
      <div className="input-group">
        <input
          name="email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => handleInputChange(setEmail, e)}
          required
        />
        <label htmlFor="email">Email </label>
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
          name="company"
          type="company"
          id="company"
          value={company}
          onChange={(e) => handleInputChange(setCompany, e)}
          
        />
        <label htmlFor="company">Company</label>
      </div>

      <div className="input-group">
        <input
          name="password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => handleInputChange(setPassword, e)}
          required
        />
        <label htmlFor="password">Password</label>
      </div>
      

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;