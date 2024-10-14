import React from 'react';
import '../css/sidebar.css';

const LeftSidebar = ({ setFilters }) => {
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const makes = ["Toyota", "Nissan", "Honda", "Ford", "Chevrolet"];

  return (
    <div className="left-sidebar">
      <img
        src={`${process.env.PUBLIC_URL}/images/sidebar_image.jpg`}
        alt="Sidebar Image"
        className="sidebar-image"
      />
      <div className="make-header">
        <h4>Make</h4>
      </div>
      <ul className="make-list">
        {makes.map((make, index) => (
          <li key={index} className="make-item">
            {make}
          </li>
        ))}
      </ul>

      <h2>Filter Options</h2>

      <div className="filter-group">
        <h3>Make</h3>
        <button onClick={() => handleFilterChange('make', 'Toyota')}>Toyota</button>
        <button onClick={() => handleFilterChange('make', 'Honda')}>Honda</button>
        <button onClick={() => handleFilterChange('make', 'Subaru')}>Subaru</button>
        <button onClick={() => handleFilterChange('make', '')}>Reset</button>
      </div>

      <div className="filter-group">
        <h3>Model</h3>
        <button onClick={() => handleFilterChange('model', 'Corolla')}>Corolla</button>
        <button onClick={() => handleFilterChange('model', 'Civic')}>Civic</button>
        <button onClick={() => handleFilterChange('model', 'Impreza')}>Impreza</button>
        <button onClick={() => handleFilterChange('model', '')}>Reset</button>
      </div>

      <div className="filter-group">
        <h3>Year</h3>
        <button onClick={() => handleFilterChange('year', '2023')}>2023</button>
        <button onClick={() => handleFilterChange('year', '2022')}>2022</button>
        <button onClick={() => handleFilterChange('year', '')}>Reset</button>
      </div>

      <div className="filter-group">
        <h3>Price</h3>
        <input 
          type="number" 
          name="price" 
          placeholder="Max Price" 
          onChange={(e) => handleFilterChange('price', e.target.value)} 
        />
      </div>

      <div className="filter-group">
        <h3>Location</h3>
        <input 
          type="text" 
          name="location" 
          placeholder="Location" 
          onChange={(e) => handleFilterChange('location', e.target.value)} 
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
