import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/searchForm.css"; // Assuming you keep the CSS in a separate file
import VehicleSelector from "./vehicleSelector"; // Import the new component
import { Link } from "react-router-dom";
const SearchForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    type: "",
    price: "",
    yearFrom: "",
    yearTo: "",
    transmission: "",
    fuelType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Data:", formData);

    const queryParams = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        queryParams[key] = formData[key];
      }
    });

    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/stocklist?${queryString}`);
  };

  return (
    <div className="search-container-wrapper">
    <div className="search-container">
      <h4>Search vehicles</h4>
      <form className="search-form" onSubmit={handleSubmit}>
        {/* Vehicle Selector Component */}
        <VehicleSelector 
          formData={formData} 
          setFormData={setFormData} 
        />

        {/* Third row: Search button */}
        <div className="form-group">
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
    </div>
    <div className="right-image register-banner">
      <img src={`${process.env.PUBLIC_URL}/images/homepage/shipping.png`} alt="shipping banner" />
      <Link to='shipping'><button className="shipping-btn">learn more</button></Link>
      
    </div>
    </div>

  );
};

export default SearchForm;