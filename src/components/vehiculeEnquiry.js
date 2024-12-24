import React, { useEffect, useState } from "react";
import "../css/vehiculeEquiry.css";
import { popularMakes, bodyTypeOptions, transmissionOptions, fetchMakes, fetchModelsForMake } from "./vehicleData";
import CountryList from './countryList';
import useCheckScreenSize from './screenSize';
import { useNavigate, useLocation } from "react-router-dom";
import { useUser  } from './userContext';

const InquiryForm = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPort, setSelectedPort] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [notification, setNotification] = useState({ type: "", message: "" });
  const { isPortrait, isSmallScreen } = useCheckScreenSize();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, login } = useUser ();
  


  const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'
    : '/server';

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: ""
  });

  const handleCountryChange = (event) => {
    const country = CountryList().find((c) => c.label === event.target.value);
    setSelectedCountry(event.target.value);
    setSelectedPort(country ? country.ports : '');
  };

  useEffect(() => {
    const loadMakes = async () => {
      const fetchedMakes = await fetchMakes();
      setMakes(fetchedMakes);
    };
    loadMakes();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/getUserInfo.php`, {
          method: 'GET',
          credentials: 'include'
        });

        const data = await response.json();
        if (data.error) {
          return;
        } else {
          setUserData({
            fullName: data.data.full_name,
            email: data.data.email,
            phone: data.data.phone,
            country: data.data.country
          });
        }
      } catch (error) {
        return;
      }
    };

    fetchUserData();
  }, []);

  const handleMakeChange = async (event) => {
    const make = event.target.value;
    setSelectedMake(make);

    if (make) {
      const fetchedModels = await fetchModelsForMake(make);
      setModels(fetchedModels);
    } else {
      setModels([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch(`${apiUrl}/sendInquiry.php`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.status === 200 && result.status === "success") {
        setNotification({ type: "success", message: "Inquiry sent successfully!" });
        
        // Reset the form fields
        setSelectedMake("");
        setModels([]);
        setSelectedCountry("");
        setSelectedPort("");
        setUserData({
          fullName: "",
          email: "",
          phone: "",
          country: ""
        });
        window.scrollTo(0, 0);
      } else {
        setNotification({ type: "error", message: "Failed to send inquiry. Please try again." });
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ type: "error", message: "An error occurred while sending the inquiry." });
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ type: "", message: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='enquiry-wrapper'>
      <form onSubmit={handleSubmit}>
        <div className="enquiryContainer">
          {notification.message && (
            <div className={`message-status ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <div className="form-section">
            <h2>Your Information</h2>
            {user ? null : (
              <div className="login-note">
                Log in for a quick auto-fill.
                <button type="button" onClick={() => {navigate('/login', { state: { from: location.pathname } })}}>Log In</button>
                <button type="button" onClick={() => {navigate('/register', { state: { from: location.pathname } })}}>Register</button>
              </div>
            )}
            <div className="form-group">
              <div className="half-width">
                <label htmlFor="name">
                  Your Name<span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="half-width">
                <label htmlFor="address">
                  Your Address<span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="half-width">
                <label htmlFor="email">
                  Email<span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="half-width">
                <label htmlFor="country">
                  Destination Country<span className="required-star">*</span>
                </label>
                <select
                  id="country"
                  value={selectedCountry || userData.country}
                  onChange={handleCountryChange}
                  name="country"
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
            </div>
            <div className="form-group">
              <div className="half-width">
                <label htmlFor="tel">
                  Tel<span className="required-star">*</span>
                </label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  value={userData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="half-width">
                <label htmlFor="port">Destination Port</label>
                <select id="port" name="port">
                  <option value="">Select</option>
                  {selectedPort && selectedPort.map((port, index) => (
                    <option key={index} value={port}>
                      {port}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group" style={{ flexDirection: "column" }}>
              <label htmlFor="message">
                Message<span className="required-star">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Vehicle Information</h2>
            <div className="form-group">
              <div className="quarter-width">
                <label htmlFor="make">Make</label>
                <select id="make" name="make" onChange={handleMakeChange}>
                  <option>Make (all)</option>
                  {makes.map((make, index) => (
                    <option key={index} value={make}>
                      {make.charAt(0).toUpperCase() + make.slice(1)}
                    </option>
                  ))}
                </select>
                <i className="fas fa-info-circle info-icon"></i>
              </div>
              <div className="quarter-width">
                <label htmlFor="year-from">Registration Year</label>
                <div className="form-group" style={{ flexDirection: "row" }}>
                  <input
                    type="text"
                    id="year-from"
                    name="year-from"
                    placeholder="From"
                    className="small-width"
                  />
                  <input
                    type="text"
                    id='year-to'
                    name="year-to"
                    placeholder="To"
                    className="small-width"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="quarter-width">
                <label htmlFor="model">Model</label>
                <select id="model" name="model">
                  <option>Model (all)</option>
                  {models.map((model, index) => (
                    <option key={index} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
                <i className="fas fa-info-circle info-icon"></i>
              </div>
              <div className="quarter-width">
                <label htmlFor="price-from">Price (FOB)</label>
                <div className="form-group" style={{ flexDirection: "row" }}>
                  <input
                    type="text"
                    id="price-from"
                    name="price-from"
                    placeholder="From"
                    className="small-width"
                  />
                  <input
                    type="text"
                    id="price-to"
                    name="price-to"
                    placeholder="To"
                    className="small-width"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="quarter-width">
                <label htmlFor="body-type">Body type</label>
                <select id="body-type" name="body-type">
                  <option>Body type (all)</option>
                  {bodyTypeOptions.map((bodyType, index) => (
                    <option key={index} value={bodyType}>
                      {bodyType}
                    </option>
                  ))}
                </select>
                <i className="fas fa-info-circle info-icon"></i>
              </div>
              <div className="quarter-width">
                <label htmlFor="mileage-from">Mileage</label>
                <div className="form-group" style={{ flexDirection: "row" }}>
                  <input
                    type="text"
                    id="mileage-from"
                    name="mileage-from"
                    placeholder="From"
                    className="small-width"
                  />
                  <input
                    type="text"
                    id="mileage-to"
                    name="mileage-to"
                    placeholder="To"
                    className="small-width"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="quarter-width">
                <label htmlFor="transmission">Transmission</label>
                <select id="transmission" name="transmission">
                  <option>Transmission (all)</option>
                  {transmissionOptions.map((transmission, index) => (
                    <option key={index} value={transmission}>
                      {transmission}
                    </option>
                  ))}
                </select>
              </div>
              <div className="quarter-width">
                <label htmlFor="steering">Steering</label>
                <select id="steering" name="steering">
                  <option>Any</option>
                  {/* Add steering options here */}
                </select>
              </div>
            </div>
          </div>
          <div className="submit-section">
            <button type="submit">
              <i className="fas fa-envelope"></i> INQUIRY
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;