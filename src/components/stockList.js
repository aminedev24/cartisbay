import React, { useState } from 'react';
import CarCard from './carCard';
import '../css/stockList.css'; // Ensure this CSS file is created for styling

const Stocklist = ({ cars }) => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    location: '',
    searchTerm: '',
  });

  const [sortOption, setSortOption] = useState('newest'); // Default sort by newest
  const [viewOption, setViewOption] = useState('grid'); // Default view is grid

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Function to handle sorting
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter cars based on filters and search term
  const filteredCars = cars.filter((car) => {
    return (
      (!filters.make || car.make.toLowerCase().includes(filters.make.toLowerCase())) &&
      (!filters.model || car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
      (!filters.year || car.year === filters.year) &&
      (!filters.price || car.price <= filters.price) &&
      (!filters.location || car.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.searchTerm || car.name.toLowerCase().includes(filters.searchTerm.toLowerCase()))
    );
  });

  // Sort cars based on the selected option
  const sortedCars = filteredCars.sort((a, b) => {
    switch (sortOption) {
      case 'price':
        return a.price - b.price;
      case 'popularity':
        return b.popularity - a.popularity; // Assuming you have a popularity field
      case 'newest':
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded); // Assuming you have a dateAdded field
    }
  });

  // Extract unique makes, models, and years for dropdowns
  const uniqueMakes = [...new Set(cars.map(car => car.make))];
  const uniqueModels = [...new Set(cars.map(car => car.model))];
  const uniqueYears = [...new Set(cars.map(car => car.year))];

  return (
    <div className="stocklist">
      <div className="filters">
        <h2>Filter Options</h2>
        <select name="make" onChange={handleFilterChange}>
          <option value="">Select Make</option>
          {uniqueMakes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
        <select name="model" onChange={handleFilterChange}>
          <option value="">Select Model</option>
          {uniqueModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
        <select name="year" onChange={handleFilterChange}>
          <option value="">Select Year</option>
          {uniqueYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="searchTerm"
          placeholder="Search by Name"
          onChange={handleFilterChange}
        />
      </div>

      <div className="sort-options">
        <h2>Sort Options</h2>
        <select onChange={handleSortChange}>
          <option value="newest">Newest Arrivals</option>
          <option value="price">Price: Low to High</option>
          <option value="popularity">Most Popular</option>
        </select>
        {/*<button onClick={() => setViewOption('grid')}>Grid View</button>
        <button onClick={() => setViewOption('list')}>List View</button*/}
       
      </div>

      <div className={`car-list ${viewOption}`}>
        {sortedCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Stocklist;
