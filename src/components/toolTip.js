import React, { useState } from 'react';
import '../css/toolTip.css';
const Tooltip = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="tooltip-container">
      <span 
        className="tooltip-icon" 
        onClick={() => setIsVisible(!isVisible)}
      >
        ?
      </span>
      {isVisible && (
        <div className="tooltip-message">
          {message}
        </div>
      )}
    </div>
  );
};

export default Tooltip;