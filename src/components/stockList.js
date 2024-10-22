import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faStar, faHandshake, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ReactCountryFlag from "react-country-flag";
import CarCard from './carCard';
import '../css/stockList.css';

const Stocklist = ({ cars }) => {
  const [sortOption, setSortOption] = useState('newest');
  const [viewOption, setViewOption] = useState('grid');

  const filteredCars = cars; // Your filter logic

  const sortedCars = filteredCars.sort((a, b) => {
    switch (sortOption) {
      case 'price':
        return a.price - b.price;
      case 'popularity':
        return b.popularity - a.popularity;
      case 'newest':
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  const countries = [
    { name: "Japan", code: "JP" },
    { name: "Namibia", code: "NA" },
    { name: "France", code: "FR" },
    { name: "Korea", code: "Ko" },
    { name: "All", code: "" }, // Use an empty code for 'All'
  ];
  

  return (
    <div className="stocklist">

      {/* New Arrivals Section */}
      <div className="new-arrivals-container">
        <div className="buttons-row">
          <button className="new-arrival-btn">
            <FontAwesomeIcon icon={faCar} /> New Arrival
          </button>
          <button className="premium-class-btn">
            <FontAwesomeIcon icon={faStar} /> Premium Class
          </button>
          <button className="from-partners-btn">
            <FontAwesomeIcon icon={faHandshake} /> From Our Partners
          </button>
        </div>

        <h4>View Vehicles in the Following Countries:</h4>
        <div className="countries-row">
        {countries.map((country, index) => (
        <button key={index} className="country-btn">
          {country.code && (
            <ReactCountryFlag
              countryCode={country.code}
              svg
              style={{
                width: '1.5em',
                height: '1.5em',
                marginRight: '8px',
              }}
              title={country.name}
            />
          )}
          {country.name}
        </button>
      ))}
        </div>
      </div>

      {/* Car List */}
      <div className={`car-list ${viewOption} ${sortedCars.length === 0 ? 'zero' : ''}`}>
        {sortedCars.length > 0 ? (
          sortedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <div className="no-cars-found-container">
            <div className="no-cars-found">No cars found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stocklist;
