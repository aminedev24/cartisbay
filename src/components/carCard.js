import React from 'react';
import { Link } from 'react-router-dom';
import '../css/carCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h2>{car.name}</h2>
      <p>${car.price}</p>
      <Link to={`/cars/${car.id}`}>View Details</Link>
    </div>
  );
};

export default CarCard;
