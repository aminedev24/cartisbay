import React, { useState ,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faStar, faHandshake, faMapMarkerAlt, faPercentage } from '@fortawesome/free-solid-svg-icons';
import ReactCountryFlag from "react-country-flag";
import CarCard from './carCard';
import '../css/stockList.css';
import { localServicesCountries } from './localServicesCountries';

const Stocklist = ({ cars }) => {
  const history = useNavigate();
  const location = useLocation();
  const [sortOption, setSortOption] = useState('newest');
  const [viewOption, setViewOption] = useState('grid');

  const queryParams = new URLSearchParams(location.search);
  const selectedMake = queryParams.get('make');
  const selectedBodyType = queryParams.get('bodyType');

  const filteredCars = cars.filter(car => {
    const makeMatch = selectedMake ? car.make === selectedMake : true;
    const bodyTypeMatch = selectedBodyType ? car.bodyType === selectedBodyType : true;
    return makeMatch && bodyTypeMatch;
  });

  const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 200); }, [queryParams]);


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

  const handleFilterChange = (make, bodyType) => {
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (bodyType) params.set('bodyType', bodyType);
    
    history.push({ search: params.toString() });
  };

  return (
    <div className="stocklist">
      {/* New Arrivals Section */}
      <div className="new-arrivals-container">
        <div className="buttons-row">
          <button className="new-arrival-btn" onClick={() => handleFilterChange('Toyota', null)}>
            <FontAwesomeIcon icon={faCar} /> New Arrival
          </button>
          <button className="premium-class-btn" onClick={() => handleFilterChange('Honda', null)}>
            <FontAwesomeIcon icon={faStar} /> Premium Class
          </button>
          <button className="from-partners-btn" onClick={() => handleFilterChange(null, 'SUV')}>
            <FontAwesomeIcon icon={faPercentage} /> Discounted Stock
          </button>
        </div>

        <h4>From our partners:</h4>
        <div className="countries-row">
          {localServicesCountries.map((country, index) => (
            <button key={index} className="country-btn">
              {country.code && (
                <ReactCountryFlag
                  countryCode={country.code}
                  svg
                  style ={{
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