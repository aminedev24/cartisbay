import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/searchForm.css"; // Assuming you keep the CSS in a separate file

const SearchForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    type: "",
    steering: "",
    price: "",
    yearFrom: "",
    yearTo: "",
    transmission: "",
    fuelType: "",
  });

  const [makesData, setMakesData] = useState([]);
  const [modelsData, setModelsData] = useState({});

  // Manually filter popular car makes
  const popularMakes = [
    "toyota",
    "honda",
    "ford",
    "nissan",
    "bmw",
    "mercedes-benz",
    "chevrolet",
    "audi",
    "volkswagen",
    "hyundai",
    "kia",
    "lexus",
    "mazda",
    "subaru",
    "tesla",
    "jeep",
    "land rover",
    "volvo",
    "jaguar",
    "porsche",
    "mitsubishi",
    "suzuki",
    "peugeot",
    "renault",
    "fiat",
    "chrysler",
    "dodge",
    "gmc",
    "cadillac",
    "infiniti",
    "acura",
    "buick",
    "lincoln",
    "bentley",
    "rolls-royce",
    "ferrari",
    "lamborghini",
    "aston martin",
    "maserati",
    "alfa romeo",
    "mini",
    "skoda",
    "citroën",
    "opel",
    "saab",
  ];

  // Fetch makes from the NHTSA API
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
        );
        const data = await response.json();
        const makes = data.Results.map((make) => make.Make_Name.toLowerCase());
        const filteredMakes = makes.filter((make) =>
          popularMakes.includes(make)
        ); // Only keep popular makes
        setMakesData(filteredMakes);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchMakes();
  }, []);

  // Function to fetch models for a selected make
  const fetchModels = async (make) => {
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`
      );
      const data = await response.json();
      const models = data.Results.map((model) => model.Model_Name);
      setModelsData((prev) => ({ ...prev, [make]: models }));
    } catch (error) {
      console.error(`Error fetching models for ${make}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "make" && { model: "" }),
    });

    // Fetch models for the selected make
    if (name === "make" && value) {
      fetchModels(value);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Data:", formData);
  
    const queryParams = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        // Capitalize the first letter for specific fields
        if (key === "make") {
          queryParams[key] = capitalizeFirstLetter(formData[key]);
        } else {
          queryParams[key] = formData[key];
        }
      }
    });
  
    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/stocklist?${queryString}`);
  };

 const getModelsForMake = () => {
    return formData.make ? modelsData[formData.make] || [] : [];
  };

  // Years range from 1980 to current year
  const yearOptions = Array.from(
    { length: new Date().getFullYear() - 1979 },
    (_, i) => 1980 + i
  );

  return (
    <>
      <div className="search-container">
        <h4>Search vehicles</h4>
        <form className="search-form" onSubmit={handleSubmit}>
          {/* Top row: Make, Model, Type */}
          <div className="form-group">
            <label htmlFor="make">Make:</label>
            <select
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
            >
              <option value="">Make</option>
              {makesData.map((make) => (
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
          </div>

          {/* Second row: Price, Year From, Year To */}
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
                < option value="">To</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Third row: Search button */}
          <div className="form-group">
            <button type="submit" className="search-btn">
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchForm;