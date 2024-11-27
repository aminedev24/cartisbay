import React from "react";
import 'car-makes-icons/dist/style.css'; // Assuming this package provides make icons

const Makestypes = () => {
  // Array for body types
  const bodyTypes = [
    {
      name: "SEDAN",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/sedan.png`,
      alt: "Sedan car icon"
    },
    {
      name: "HATCHBACK",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/hatch.png`,
      alt: "Hatchback car icon"
    },
    {
      name: "SUV",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/suv.png`,
      alt: "SUV car icon"
    },
    {
      name: "WAGON",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/wagon.png`,
      alt: "Wagon car icon"
    },
    {
      name: "VAN",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/van.png`,
      alt: "Van car icon"
    },
    {
      name: "TRUCK",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/truck.png`,
      alt: "Truck car icon"
    },
    {
      name: "HYBRID",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/hybrid.png`,
      alt: "Hybrid car icon"
    },
    {
      name: "MINI",
      imgSrc: `${process.env.PUBLIC_URL}/images/car-icons/mini.png`,
      alt: "Mini car icon"
    }
  ];

  // Array for makes
  const makes = [
    {
      name: "Toyota"
    },
    {
      name: "Nissan"
    },
    {
      name: "Honda"
    },
    {
      name: "Mazda"
    },
    {
      name: "Subaru"
    },
    {
      name: "Mitsubishi"
    },
    {
      name: "Suzuki"
    },
    {
      name: "Audi"
    },
    {
      name: "Isuzu"
    },
    {
      name: "Mercedes-benz"
    },
    {
      name: "BMW"
    },
    {
      name: "Volkswagen"
    }
  ];

  return (
    <div className="main-container">
      <div className="type-container">
        <div className="title">Body Type</div>
        <div className="grid">
          {bodyTypes.map((type, index) => (
            <div className="grid-item" key={index}>
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
            <div className="brand" key={index}>
              <span className={`make-icon car-${make.name.toLowerCase()}`}></span>
              <p>{make.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Makestypes;