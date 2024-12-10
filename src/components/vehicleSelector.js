import React, { useEffect, useState } from "react";
import { popularMakes, bodyTypeOptions, transmissionOptions, fetchMakes, fetchModelsForMake } from "./vehicleData";

const VehicleSelector = ({ formData, setFormData }) => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]); // State for models

  // Fetch makes from the NHTSA API
  useEffect(() => {
    const loadMakes = async () => {
      const fetchedMakes = await fetchMakes();
      setMakes(fetchedMakes);
    };

    loadMakes();
  }, []);

  // Function to fetch models for a selected make
  const fetchModels = async (make) => {
    const fetchedModels = await fetchModelsForMake(make);
    setModels(fetchedModels);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "make" && { model: "" }), // Reset model when make changes
    }));

    // Fetch models for the selected make
    if (name === "make" && value) {
      fetchModels(value);
    }
  };

  const getModelsForMake = () => {
    return formData.make ? models : [];
  };

  // Years range from 1980 to current year
  const yearOptions = Array.from(
    { length: new Date().getFullYear() - 1979 },
    (_, i) => 1980 + i
  );

  return (
    <>
      <div className="form-group">
        <label htmlFor="make">Make:</label>
        <select
          id="make"
          name="make"
          value={formData.make}
          onChange={handleChange}
        >
          <option value="">Make</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make.charAt(0).toUpperCase() + make.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="model">Model:</label>
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
      </div>

      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Type</option>
          {bodyTypeOptions.map((type) => (
            <option key={type} value={type.toLowerCase()}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="price">Price:</label>
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
        </select>
      </div>

      <div className="year-group">
        <div className="form-group">
          <label htmlFor="yearFrom">Year From:</label>
          <select
            id="yearFrom"
            name="yearFrom"
            value={formData.yearFrom}
            onChange={handleChange}
          >
            <option value="">From</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="yearTo">Year To:</label>
          <select
            id="yearTo"
            name="yearTo"
            value={formData.yearTo}
            onChange={handleChange}
          >
            <option value="">To</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default VehicleSelector;