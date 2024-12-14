import React from 'react';
import './TireWidth.css';

const TireWidth = () => {
  return (
    <div className="tire-width-container">
      <h1>Tire Width</h1>
      <p>
        Tire widths typically range from about 135 mm to 335 mm for passenger vehicles, although specialty and performance tires may vary. Here’s a breakdown of common widths:
      </p>
      <ol>
        <li>
          Narrow tires: 135 mm to 175 mm - Often found on compact cars and economy vehicles.
        </li>
        <li>
          Standard tires: 185 mm to 225 mm - Common on mid-sized sedans and family vehicles.
        </li>
        <li>
          Wider tires: 225 mm to 305 mm - Typically used on sports cars and performance vehicles.
        </li>
        <li>
          Ultra-wide tires: 305 mm and above - Generally seen on high-performance or racing vehicles.
        </li>
      </ol>
      <p>
        When selecting tires, it’s important to consider the vehicle specifications, driving conditions, and personal preferences for handling and comfort. Always consult your vehicle’s manual or a tire specialist for the best fit.
      </p>
    </div>
  );
};

export default TireWidth;
