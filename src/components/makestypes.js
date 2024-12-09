import React from "react";
import { useNavigate } from "react-router-dom";
import 'car-makes-icons/dist/style.css'; // Assuming this package provides make icons

const Makestypes = () => {
  const navigate = useNavigate();

  // Array for body types
  const bodyTypes = [
    {
      name: "Sedan",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/sedan.png`,
      alt: "Sedan car icon"
    },
    {
      name: "Hatchback",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/hatch.png`,
      alt: "Hatchback car icon"
    },
    {
      name: "Suv",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/suv.png`,
      alt: "SUV car icon"
    },
    {
      name: "Wagon",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/wagon.png`,
      alt: "Wagon car icon"
    },
    {
      name: "Van",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/van.png`,
      alt: "Van car icon"
    },
    {
      name: "Truck",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/truck.png`,
      alt: "Truck car icon"
    },
    {
      name: "Hybrid",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/hybrid.png`,
      alt: "Hybrid car icon"
    },
    {
      name: "Mini",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/mini.png`,
      alt: "Mini car icon"
    }
  ];

  // Array for makes
  const makes = [
    { name: "Toyota" },
    { name: "Nissan" },
    { name: "Honda" },
    { name: "Mazda" },
    { name: "Subaru" },
    { name: "Mitsubishi" },
    { name: "Suzuki" },
    { name: "Audi" },
    { name: "Isuzu" },
    { name: "Mercedes-benz" },
    { name: "BMW" },
    { name: "Volkswagen" }
  ];

  const handleFilterChange = (make, bodyType) => {
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (bodyType) params.set('bodyType', bodyType);
    
    // Use navigate to change the URL
    navigate(`/stocklist?${params.toString()}`);
  };

  return (
    <div className="wrapper">
    <img className="title-img" src={`${process.env.PUBLIC_URL}/images/vehiclesearchtitle.png`} alt="vehicle quick search" />

    <div className="main-container">
       
      <div className="type-container">
        <div className="title">Body Type</div>
        <div className="grid">
          {bodyTypes.map((type, index) => (
            <div className="grid-item" key={index} onClick={() => handleFilterChange(null, type.name)}>
              <img alt={type.alt} src={type.imgSrc} />
              <span>{type.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="make-container">
            <div className="title">Makes</div>
            <div className="brands">
                {makes.map((make, index) => (
                    <div className="brand" key={index} onClick={() => handleFilterChange(make.name, null)}>
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/makes/${make.name.toLowerCase()}-logo.png`} 
                            alt={make.name} 
                            className="make-icon" 
                        />
                        <p>{make.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
  );
};

export default Makestypes;