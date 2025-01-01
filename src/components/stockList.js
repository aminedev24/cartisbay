import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faStar, faPercentage } from '@fortawesome/free-solid-svg-icons';
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
    const selectedPrice = queryParams.get('price');
    const searchKeyword = queryParams.get('search'); // Get the search keyword

    const filterByPrice = (price, selectedPrice) => {
        switch (selectedPrice) {
            case 'under500':
                return price < 500;
            case 'under1000':
                return price < 1000;
            case 'under1500':
                return price < 1500;
            case 'under2000':
                return price < 2000;
            case 'under2500':
                return price < 2500;
            default:
                return true; // No price filter applied
        }
    };
    const filteredCars = cars.filter(car => {
      const makeMatch = selectedMake ? car.make === selectedMake : true;
      const bodyTypeMatch = selectedBodyType ? car.bodyType === selectedBodyType : true;
      const priceMatch = selectedPrice ? filterByPrice(car.price, selectedPrice) : true;
  
      // Check if the search keyword matches either the make, bodyType, or model
      const searchMatch = searchKeyword
          ? car.make.toLowerCase().includes(searchKeyword.toLowerCase()) || // Match make
            car.bodyType.toLowerCase().includes(searchKeyword.toLowerCase()) || // Match bodyType
            car.model.toLowerCase().includes(searchKeyword.toLowerCase()) // Match model
          : true;
  
      return makeMatch && bodyTypeMatch && priceMatch && searchMatch;
  });

    useEffect(() => { window.scrollTo(0, 200); }, [queryParams]);

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
        const params = new URLSearchParams(location.search);
        if (make) params.set('make', make);
        if (bodyType) params.set('bodyType', bodyType);
        if (searchKeyword) params.set('search', searchKeyword); // Include search keyword in params
        history.push(`/stocklist?${params.toString()}`); // Navigate with updated params
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
                        <div className="no-cars-found">No stock</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stocklist;