import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/shipping.css';
import useCheckScreenSize from './screenSize';
import AfricaShippingTable from "./africaContainer";
import AfricaRoroShippingTable from "./africaRoroContainer";

const Shipping = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  // Extract destination from URL or default to null
  const [showTable, setShowTable] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const destParam = searchParams.get('dest');
    return destParam ? parseInt(destParam) : null;
  });

  useEffect(() => {
    if (showTable !== null) {
      const applyFontSize = () => {
        const fontSize = (() => {
          if (isSmallScreen && isPortrait) return '20px';
          if (isSmallScreen && !isPortrait) return '20px';
          return '10px';
        })();
  
        // Use a timeout to ensure the table is rendered
        setTimeout(() => {
          const elements = document.querySelectorAll('th, td');
          elements.forEach((el) => {
            el.style.fontSize = fontSize;
          });
        }, 0);
      };
  
      applyFontSize();
      
      // Update URL parameter when table changes
      navigate(`?dest=${showTable}`, { replace: true });
    }
  }, [showTable, isSmallScreen, isPortrait, navigate]);
  const handleAfricaRoroClick = () => {
    setShowTable(1);
  };

  const handleAfricaContainerClick = () => {
    setShowTable(2);
  };

  return (
    <div 
      className="shipping-container"
    >
      <div className="header">
        <img
          alt="Company Logo"
          src={`${process.env.PUBLIC_URL}/images/logo3new.png`} 
          width="130"
        />
        <h1>Shipping Schedule</h1>
      </div>
      <div className="content">
        <button 
          onClick={handleAfricaRoroClick}
          className={showTable === 1 ? 'active' : ''}
        >
          AFRICA (RO-RO)
        </button>
        <button 
          onClick={handleAfricaContainerClick}
          className={showTable === 2 ? 'active' : ''}
        >
          AFRICA (CONTAINER)
        </button>
      </div>
      {/* Render only the selected table */}
      {showTable === 1 && <AfricaRoroShippingTable />}
      {showTable === 2 && <AfricaShippingTable />}
    </div>
  );
};

export default Shipping;