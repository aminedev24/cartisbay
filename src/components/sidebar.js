import React from 'react';
import '../css/sidebar.css';
import 'car-makes-icons/dist/style.css'; // Assuming this package provides make icons
import { FaDollarSign, FaTag } from 'react-icons/fa'; // Importing icons for price and discount

const LeftSidebar = ({ setFilters }) => {
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const makes = [
    "Toyota", 
    "Nissan", 
    "Honda", 
    "Ford", 
    "Chevrolet", 
    "BMW", 
    "Mercedes", 
    "Volkswagen", 
    "Subaru", 
    "Kia", 
    "Hyundai", 
    "Mazda", 
    "Audi", 
    "Lexus", 
    "Porsche", 
    "Jaguar", 
    "Land Rover", 
    "Dodge", 
    "Chrysler", 
    "Buick"
  ];

  return (
    <div className="left-sidebar">
      <img
        src={`${process.env.PUBLIC_URL}/images/usedTires.jpg`}
        alt="used tires ad"
        className="sidebar-image"
      />
      <div className="make-header">
        <h4>Make</h4>
      </div>
      <ul className="make-list">
        {makes.map((make, index) => (
          <li key={index} className="make-item">
            <span className={`make-icon car-${make.toLowerCase()}`}></span> {/* Add icon */}
            {make}
          </li>
        ))}
      </ul>

      {/* Shop by Price Section */}
      <div className="price-header">
        <h4><FaDollarSign /> Shop by Price</h4>
      </div>
      <ul className="price-list">
        <li className="price-item" onClick={() => handleFilterChange('price', 'under_500')}>Under $500</li>
        <li className="price-item" onClick={() => handleFilterChange('price', '500_1000')}>$500 - $1000</li>
        <li className="price-item" onClick={() => handleFilterChange('price', '1000_1500')}>$1000 - $1500</li>
        <li className="price-item" onClick={() => handleFilterChange('price', '1500_2000')}>$1500 - $2000</li>
        <li className="price-item" onClick={() => handleFilterChange('price', '2500_4000')}>$2500 - $4000</li>
      </ul>

      {/* Shop by Discount Section */}
      <div className="discount-header">
        <h4><FaTag /> Shop by Discount</h4>
      </div>
      <ul className="discount-list">
        <li className="discount-item" onClick={() => handleFilterChange('discount', '70_or_more')}>70% off or more</li>
        <li className="discount-item" onClick={() => handleFilterChange('discount', '60_or_more')}>60% off or more</li>
        <li className="discount-item" onClick={() => handleFilterChange('discount', '50_or_more')}>50% off or more</li>
        <li className="discount-item" onClick={() => handleFilterChange('discount', '40_or_more')}>40% off or more</li>
        <li className="discount-item" onClick={() => handleFilterChange('discount', '30_or_more')}>30% off or more</li>
        <li className="discount-item" onClick={() => handleFilterChange('discount', '1_to_30')}>1% - 30% off</li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
