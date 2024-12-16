import React, { useEffect, useState } from "react";
import "../css/vehiculeEquiry.css";
import { popularMakes, bodyTypeOptions, transmissionOptions, fetchMakes, fetchModelsForMake } from "./vehicleData";
import CountryList from './countryList';

const InquiryForm = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]); // State for models
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPort, setSelectedPort] = useState("");
  const [selectedMake, setSelectedMake] = useState(""); // State for selected make
  const [notification, setNotification] = useState({ type: "", message: "" });

  
    // Dynamically set API URL based on environment
    const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'  // Development URL
    : '/server';  // Production URL (relative path)

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: ""
  });

  const handleCountryChange = (event) => {
    const country = CountryList().find((c) => c.label === event.target.value);
    setSelectedCountry(event.target.value);
    setSelectedPort(country ? country.ports : '');  // Update the ports based on selected country
  };

  // Fetch makes and models on initial load
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
          credentials: 'include' // Send cookies
        });

        const data = await response.json();
        //console.log(data)
        if (data.error) {
          //alert(data.error); // Handle errors (e.g., user not logged in)
          return
        } else {
          setUserData({
            fullName: data.data.full_name, // Correctly map the full_name key
            email: data.data.email,
            phone: data.data.phone,
            country: data.data.country
          });
          
        }
      } catch (error) {
        //console.error('Error fetching user data:', error);
        return
      }
    };

    fetchUserData();
  }, []); // This useEffect will run once when the component is mounted

  /*
  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);
  */
 
  //console.log(userData)
  const handleMakeChange = async (event) => {
    const make = event.target.value;
    setSelectedMake(make);

    // Fetch models for the selected make
    if (make) {
      const fetchedModels = await fetchModelsForMake(make);
      setModels(fetchedModels); // Update the models state with fetched models
    } else {
      setModels([]); // Clear models if no make is selected
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(event.target); // Get form data
    //console.log(formData)
    try {
      const response = await fetch(`${apiUrl}/sendInquiry.php`, {
        method: 'POST',
        body: formData,
      });
  
      // Log response for debugging
     // console.log('Response Status:', response.status);
      const result = await response.json();
  
      if (response.status === 200 && result.status === "success") {
        //alert(result.message); // Show success message
        setNotification({ type: "success", message: "Inquiry sent successfully!" });
        //setMessage(""); // Clear message field
        setSelectedMake(""); // Clear selected make
        setModels([]); // Clear selected models
        window.scrollTo(0,0)
      } else {
        setNotification({ type: "error", message: "Failed to send inquiry. Please try again." });
        window.scrollTo(0,0)

        //alert(result.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ type: "error", message: "An error occurred while sending the inquiry." });
      window.scrollTo(0,0)

      //alert('An error occurred while sending the inquiry.');
    }
  };
  
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ type: "", message: "" }), 5000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount or notification change
    }
  }, [notification]);
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="enquiryContainer">
      {notification.message && (
        <div className={`message-status ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="form-section">
      <h2>Your Information</h2>
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
            required
            readOnly={!!userData.fullName} // Make input read-only if data exists
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
            required
            // Address field can be made read-only when userData is loaded, but if you want to use a fixed address, you can set a default
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
            required
            readOnly={!!userData.email} // Make email read-only if data exists
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
           // disabled={!!userData.country} // Disable the country select if data exists
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
            required
            readOnly={!!userData.phone} // Make phone read-only if data exists
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
          required
        />
      </div>
      </div>

        {/* The rest of the form continues with vehicle information */}
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
                id="year-to"
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
        {/* Submit and checkbox section */}
        <div className="submit-section">
          <button type="submit">
            <i className="fas fa-envelope"></i> INQUIRY
          </button>
        </div>
      </div>
    </form>
  );
};

export default InquiryForm;
