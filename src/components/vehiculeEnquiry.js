// InquiryForm.js
import React, { useEffect, useState } from "react";
import "../css/vehiculeEquiry.css";
import { popularMakes, bodyTypeOptions, transmissionOptions, fetchMakes, fetchModelsForMake } from "./vehicleData";

const InquiryForm = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]); // State for models
  const [selectedMake, setSelectedMake] = useState(""); // State for selected make

  useEffect(() => {
    const loadMakes = async () => {
      const fetchedMakes = await fetchMakes();
      setMakes(fetchedMakes);
    };
    loadMakes();
  }, []);

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

    try {
      const response = await fetch('server/sendInquiry.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.status === "success") {
        alert(result.message); // Show success message
      } else {
        alert(result.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the inquiry.');
    }
  };

  return (
    <div className="enquiryContainer">
      <div className="form-section">
        <h2>Your Information</h2>
        <div className="form-group">
          <div className="half-width">
            <label htmlFor="name">
              Your Name<span className="required-star">*</span>
            </label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="half-width">
            <label htmlFor="address">
              Your Address<span className="required-star">*</span>
            </label>
            <input type="text" id="address" name="address" required />
          </div>
        </div>
        <div className="form-group">
          <div className="half-width">
            <label htmlFor="email">
              Email<span className="required-star">*</span>
            </label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="half-width">
            <label htmlFor="country">
              Destination Country<span className="required-star">*</span>
            </label>
            <select id="country" name="country" required>
              <option>Select</option>
              {/* Add country options here */}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="half-width">
            <label htmlFor="tel">
              Tel<span className="required-star">*</span>
            </label>
            <input type="tel" id="tel" name="tel" required />
          </div>
          <div className="half-width">
            <label htmlFor="port">Destination Port</label>
            <select id="port" name="port">
              <option>Select</option>
              {/* Add port options here */}
            </select>
          </div>
        </div>
        <div className="form-group" style={{ flexDirection: "column" }}>
          <label htmlFor="message">
            Message<span className="required-star">*</span>
          </label>
          <textarea id="message" name="message" required></textarea>
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
                name="year-from "
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
      <div className="submit-section">
        <button type="submit">
          <i className="fas fa-envelope"></i> INQUIRY
        </button>
      </div>
      <div className="checkbox-section">
        <input type="checkbox" id="receive-news" name="receive-news" />
        <label htmlFor="receive-news">
          Receive news
        </label>
      </div>
    </div>
  );
};

export default InquiryForm;