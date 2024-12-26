import React, { useState, useEffect } from 'react';
import '../css/topbar.css'; // Adjust your CSS file path accordingly

const TopBar = () => {
  const [japanTime, setJapanTime] = useState('');
  const [usdToYenRate, setUsdToYenRate] = useState(154.95); // Example rate, replace with actual fetching logic
  const [country, setCountry] = useState('Japan');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');

  // Function to update Japan Standard Time
  useEffect(() => {
    const updateJapanTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const japanTimeString = now.toLocaleTimeString('en-US', options);
      setJapanTime(japanTimeString);
    };

    // Update the time every second
    const interval = setInterval(updateJapanTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='top-bar-wrapper'>

  
    <div className="top-bar">
      <div className="app-info">
        <span className="app-name">Artisbay</span>
        <span className="total-cars">Total Cars in Stock: 120</span>
        <span className="cars-added-today">Cars Added Today: 5</span>
      </div>
      <div className="extra-info">
        <span className="time">Japan Standard Time: {japanTime}</span>
        <span className="exchange-rate">USD/JPY: $1 = ¥{usdToYenRate}</span>
        {/*
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="Japan">Japan</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
        </select>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="JPY">JPY</option>
          <option value="EUR">EUR</option>
        </select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Japanese">Japanese</option>
          <option value="French">French</option>
        </select>
        */}
      </div>
      </div>
    </div>
  );
};

export default TopBar;
