import React from 'react';
import '../css/sidebar.css';
import 'car-makes-icons/dist/style.css'; // Assuming this package provides make icons
import { FaShuttleVan,FaTag,FaDollarSign,FaCarSide, FaTruck, FaBus, FaMotorcycle, FaTractor, FaTools, FaQuestion, FaSyncAlt } from 'react-icons/fa'; // Added more icons
import axios from 'axios'; // Or you can use fetch instead

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
    "Volkswagen", 
    "Subaru", 
    "Kia", 
    "Hyundai", 
    "Mazda", 
    "Audi", 
    "Lexus", 
    "Porsche", 
    "Jaguar", 
    "Dodge", 
    "Chrysler", 
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

    {/* Shop by Type Section */}
    <div className="type-header">
        <h4><FaCarSide className='type-icon' /> Shop by Type</h4>
      </div>
      <ul className="type-list">
        <li className="type-item" onClick={() => handleFilterChange('type', 'sedan')}>
           Sedan
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'hatchback')}>
           Hatchback
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'suv')}>
           SUV
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'miniVan')}>
          Mini Van
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'van')}>
           Van
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'truck')}>
           Truck
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'wagon')}>
           Wagon
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'coupe')}>
           Coupe
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'miniVehicle')}>
           Mini Vehicle
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'bus')}>
           Bus
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'miniBus')}>
           Mini Bus
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'pickup')}>
          Pick up
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'convertible')}>
           Convertible
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'tractor')}>
           Tractor
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'forklift')}>
          Forklift
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'machinery')}>
          Machinery
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'bus_20_seats')}>
          Bus 20 Seats
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'unspecified')}>
         Unspecified
        </li>
        <li className="type-item" onClick={() => handleFilterChange('type', 'others')}>
           Others
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
