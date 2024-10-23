import React, { useState, useEffect } from "react";
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

  const [makes, setMakes] = useState([]);
  const [modelsData, setModelsData] = useState({});
  const [loading, setLoading] = useState(true);

  // Years range from 1980 to current year
  const yearOptions = Array.from(
    { length: new Date().getFullYear() - 1979 },
    (_, i) => 1980 + i
  );

  // Fetch makes and models once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check local storage first
        const cachedMakes = localStorage.getItem("makes");
        if (cachedMakes) {
          const cachedData = JSON.parse(cachedMakes);
          setMakes(cachedData.makes);
          setModelsData(cachedData.modelsData);
          setLoading(false);
          return;
        }

        // Fetch makes from the NHTSA API
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
        );
        const data = await response.json();
        const makesList = data.Results.map((make) => make.Make_Name.toLowerCase());

        // Here, you could also set modelsData based on your logic if needed.

        // Save to local storage for caching
        localStorage.setItem("makes", JSON.stringify({ makes: makesList, modelsData: {} }));
        setMakes(makesList);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "make" && { model: "" }), // Reset model when make changes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Data:", formData);
  };

  const getModelsForMake = () => {
    return formData.make ? modelsData[formData.make] || [] : [];
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state while data is being fetched
  }

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
                  {makes.map((make) => (
                    <option key={make} value={make}>
                      {make.charAt(0).toUpperCase() + make.slice(1)}
                    </option>
                  ))}
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
                  <option value="hatchback">Hatchback</option>
                  <option value="suv">SUV</option>
                  <option value="mini-van">Mini Van</option>
                  <option value="van">Van</option>
                  <option value="truck">Truck</option>
                  <option value="wagon">Wagon</option>
                  <option value="coupe">Coupe</option>
                  <option value="mini-vehicle">Mini Vehicle</option>
                  <option value="bus">Bus</option>
                  <option value="mini-bus">Mini Bus</option>
                  <option value="pickup">Pick up</option>
                  <option value="convertible">Convertible</option>
                  <option value="tractor">Tractor</option>
                  <option value="forklift">Forklift</option>
                  <option value="machinery">Machinery</option>
                  <option value="bus-20-seats">Bus 20 Seats</option>
                  <option value="unspecified">Unspecified</option>
                  <option value="others">Others</option>
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
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default SearchForm;
