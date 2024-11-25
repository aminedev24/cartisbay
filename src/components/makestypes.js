import React from "react";
import 'car-makes-icons/dist/style.css'; // Assuming this package provides make icons

const Makestypes = () => {
  // Array for body types
  const bodyTypes = [
    {
      name: "SEDAN",
      imgSrc: "https://storage.googleapis.com/a1aa/image/va4kVR0rEvqTHtZeS536eGeNYvR203lyVttGMYKLykErqGpnA.jpg",
      alt: "Sedan car icon"
    },
    {
      name: "HATCHBACK",
      imgSrc: "https://storage.googleapis.com/a1aa/image/BQMRiY9I6h7fM6ZeVKvNbtgj8pm6aeHvi6BoMCJVujFxqGpnA.jpg",
      alt: "Hatchback car icon"
    },
    {
      name: "SUV",
      imgSrc: "https://storage.googleapis.com/a1aa/image/FMQBgsshxqpRL5XDNOO2CIQfGfbB4WsQgLdbsEvmH2OaVj0TA.jpg",
      alt: "SUV car icon"
    },
    {
      name: "WAGON",
      imgSrc: "https://storage.googleapis.com/a1aa/image/Z1eV0HDVCOX6NyY31CvlidJr5hpoR85vt7vvAnLl8X9tqR6JA.jpg",
      alt: "Wagon car icon"
    },
    {
      name: "VAN",
      imgSrc: "https://storage.googleapis.com/a1aa/image/f5ou5Bv8Az0qGahKE8mXvejdEGTCm45gJn7PwGGH8E0WVj0TA.jpg",
      alt: "Van car icon"
    },
    {
      name: "TRUCK",
      imgSrc: "https://storage.googleapis.com/a1aa/image/qamcemH6QUWSeEWeHjiSRaKeVqh2r4pWjpuvqhy62dNOVNSPB.jpg",
      alt: "Truck car icon"
    },
    {
      name: "HYBRID",
      imgSrc: "https://storage.googleapis.com/a1aa/image/49555WXV7jINAx30zo16T6gM0n1vwJ4wELNeNje3QJDXVj0TA.jpg",
      alt: "Hybrid car icon"
    },
    {
      name: "MINI",
      imgSrc: "https://storage.googleapis.com/a1aa/image/8hDeU5ExeaheSIQNmmRvlLC2F6cEXrDBtisFMayHlvk6qGpnA.jpg",
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