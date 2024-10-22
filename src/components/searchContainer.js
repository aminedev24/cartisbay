import React, { useState } from "react";
import "../css/searchForm.css"; // Assuming you keep the CSS in a separate file

const SearchForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    type: "",
    steering: "",
    price: "",
    yearFrom: "",
    yearTo: "",
  });

  const modelsData = {
    toyota: ["Corolla", "Camry", "RAV4"],
    nissan: ["Altima", "Maxima", "Rogue"],
    honda: ["Civic", "Accord", "CR-V"],
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset the model if the make changes
      ...(name === "make" && { model: "" }),
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Data:", formData);
    // Perform search or handle form data submission here
  };

  // Get the models for the selected make
  const getModelsForMake = () => {
    return formData.make ? modelsData[formData.make] || [] : [];
  };

  return (
    <div className="search-container">
      <h4>Search Cars</h4>
      <form className="search-form" onSubmit={handleSubmit}>
  <table>
    <tbody>
      {/* First Row */}
      <tr>
        <td><label htmlFor="make">Make:</label></td>
        <td>
          <select
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            
          >
            <option value="">Make</option>
            <option value="toyota">Toyota</option>
            <option value="nissan">Nissan</option>
            <option value="honda">Honda</option>
          </select>
        </td>
        
        <td><label htmlFor="model">Model:</label></td>
        <td>
          <select
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            disabled={!formData.make}
          >
            <option value="">Model</option>
            {getModelsForMake().map((model) => (
              <option key={model} value={model.toLowerCase()}>
                {model}
              </option>
            ))}
          </select>
        </td>
        
        <td><label htmlFor="type">Type:</label></td>
        <td>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Type</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
          </select>
        </td>
         <td colSpan="2">
          <button type="submit" className="search-btn">
            Search
          </button>
        </td>
      </tr>

      {/* Second Row */}
      <tr>
        <td><label htmlFor="steering">Steering:</label></td>
        <td>
          <select
            id="steering"
            name="steering"
            value={formData.steering}
            onChange={handleChange}
          >
            <option value="">Steering</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </td>
        
        <td><label htmlFor="price">Price:</label></td>
        <td>
          <select
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          >
            <option value="">Price</option>
            <option value="under500">Under $500</option>
            <option value="under1000">Under $1,000</option>
            <option value="under1500">Under $1,500</option>
            <option value="under2000">Under $2,000</option>
            <option value="under2500">Under $2,500</option>
            <option value="under4000">Under $4,000</option>
          </select>
        </td>
        
        <td><label>Year:</label></td>
        <td>
          <div className="year-inputs">
            <input
              type="number"
              id="yearFrom"
              name="yearFrom"
              value={formData.yearFrom}
              onChange={handleChange}
              placeholder="From"
              min="1900"
              max={new Date().getFullYear()}
            />
            <input
              type="number"
              id="yearTo"
              name="yearTo"
              value={formData.yearTo}
              onChange={handleChange}
              placeholder="To"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</form>

    </div>
  );
};

export default SearchForm;
