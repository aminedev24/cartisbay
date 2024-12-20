import React, { useState, useEffect } from "react";
import '../css/shipping.css';
import useCheckScreenSize from './screenSize';
import AfricaShippingTable from "./africaContainer";
import AfricaRoroShippingTable from "./africaRoroContainer";

const Shipping = () => {
  const [showTable, setShowTable] = useState(null); // null for no table, 1 for Roro, 2 for Container
  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  useEffect(() => {
    if (showTable !== null) { // Apply font size only when a table is visible
      const applyFontSize = () => {
        const fontSize = (() => {
          if (isSmallScreen && isPortrait) return '20px';
          if (isSmallScreen && !isPortrait) return '20px';
          return '10px';
        })();

        // Select all <th> and <td> elements and apply the font size
        const elements = document.querySelectorAll('th, td');
        elements.forEach((el) => {
          el.style.fontSize = fontSize;
        });
      };

      // Apply font size when the table is rendered
      applyFontSize();
    }
  }, [showTable, isSmallScreen, isPortrait]); // Re-run when showTable or screen size changes

  const handleAfricaRoroClick = () => {
    setShowTable(1); // Show Africa Roro table
  };

  const handleAfricaContainerClick = () => {
    setShowTable(2); // Show Africa Container table
  };

  return (
    <div className="shipping-container">
      <div className="header">
        <img
          alt="Company Logo"
          src={`${process.env.PUBLIC_URL}/images/logo3new.png`} 
          width="130"
        />
        <h1>Shipping Schedule</h1>
      </div>
      <div className="content">
        <button onClick={handleAfricaRoroClick}>AFRICA (RO-RO)</button>
        <button onClick={handleAfricaContainerClick}>AFRICA (CONTAINER)</button>

        
      </div>
      {/* Render only the selected table */}
      {showTable === 1 && <AfricaRoroShippingTable />}
      {showTable === 2 && <AfricaShippingTable />}
    </div>
  );
};

export default Shipping;
