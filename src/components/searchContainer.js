import React, { useState } from "react";
import "../css/searchForm.css"; // Assuming you keep the CSS in a separate file

const SearchForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    type: "",
    steering: "",
    price: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Data:", formData);
    // Perform search or handle form data submission here
  };

  return (
    <div className="search-container">
      <h4>Search Cars</h4>
      <form className="search-form" onSubmit={handleSubmit}>
        {/* Make */}
        <div className="form-group">
          <label htmlFor="make">Make</label>
          <select id="make" name="make" value={formData.make} onChange={handleChange}>
            <option value="">Select Make</option>
            <option value="toyota">Toyota</option>
            <option value="nissan">Nissan</option>
            <option value="honda">Honda</option>
          </select>
        </div>

        {/* Model */}
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <select id="model" name="model" value={formData.model} onChange={handleChange}>
            <option value="">Select Model</option>
            {/* Toyota models */}
            <optgroup label="Toyota">
              <option value="corolla">Corolla</option>
              <option value="camry">Camry</option>
              <option value="rav4">RAV4</option>
            </optgroup>
            {/* Nissan models */}
            <optgroup label="Nissan">
              <option value="altima">Altima</option>
              <option value="maxima">Maxima</option>
              <option value="rogue">Rogue</option>
            </optgroup>
            {/* Honda models */}
            <optgroup label="Honda">
              <option value="civic">Civic</option>
              <option value="accord">Accord</option>
              <option value="crv">CR-V</option>
            </optgroup>
          </select>
        </div>

        {/* Type */}
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
          </select>
        </div>

           {/* Search Button */}
           <button type="submit" className="search-btn">
          Search
        </button>

        {/* Steering */}
        <div className="form-group">
          <label htmlFor="steering">Steering</label>
          <select id="steering" name="steering" value={formData.steering} onChange={handleChange}>
            <option value="">Select Steering</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Max price"
          />
        </div>

        {/* Year */}
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
          />
        </div>

     
      </form>
    </div>
  );
};

export default SearchForm;
