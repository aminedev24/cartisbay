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
    "saab"
  ];
  
  // Fetch makes from the NHTSA API
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json");
        const data = await response.json();
        const makes = data.Results.map((make) => make.Make_Name.toLowerCase());
        const filteredMakes = makes.filter((make) => popularMakes.includes(make)); // Only keep popular makes
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
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Data:", formData);
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
    <div className="video-container">
      <video className="banner-video" autoPlay loop muted>
        <source src={`${process.env.PUBLIC_URL}/vids/hero.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Optional: If you want to use an image instead of a video, uncomment the line below */}
      {/* <img src="path_to_your_image.jpg" alt="Banner" className="banner-image" /> */}
    </div>
    <section className="car-dismantling">
            <div className="dismantling-content">
            <h2>Car Dismantling Services</h2>
            <p>
            Our car dismantling services provide careful disassembly for efficient shipping. Each vehicle is systematically broken down, with parts thoroughly inspected, cleaned, and packed to ensure safe, cost-effective transport to international destinations.
            </p>
            
            </div>
            <div className="dismantling-image">
            <img src={`${process.env.PUBLIC_URL}/images/car-dismantlingBanner.jpg`} alt="Car Dismantling" />
            </div>
        </section>
        
      <div className="search-container">
      <h4>Search Cars</h4>
      <form className="search-form" onSubmit={handleSubmit}>
        <table>
          <tbody>
            {/* First Row */}
            <tr>
              <td className="label-cell"><label htmlFor="make">Make:</label></td>
              <td>
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
              </td>

              <td className="label-cell"><label htmlFor="model">Model:</label></td>
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

              <td className="label-cell"><label htmlFor="type">Type:</label></td>
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
              <td className="label-cell"><label htmlFor="steering">Steering:</label></td>
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

              <td className="label-cell"><label htmlFor="price">Price:</label></td>
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
                </select>
              </td>

              <td className="label-cell"><label htmlFor="yearFrom">Year:</label></td>
              <td>
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
              </td>
              <td>
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
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      </div>
    </>
  );
};

export default SearchForm;
