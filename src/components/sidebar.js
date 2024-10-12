import React from 'react';
import '../css/sidebar.css';

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <h2>Filter Options</h2>
      <select name="make">
        <option value="">Select Make</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
        <option value="Subaru">Subaru</option>
      </select>
      <select name="model">
        <option value="">Select Model</option>
        <option value="Corolla">Corolla</option>
        <option value="Civic">Civic</option>
        <option value="Impreza">Impreza</option>
      </select>
      <select name="year">
        <option value="">Select Year</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>
      <input type="number" name="price" placeholder="Max Price" />
      <input type="text" name="location" placeholder="Location" />
    </div>
  );
};

export default LeftSidebar;
