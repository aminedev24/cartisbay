import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import CarList from './components/carList';
import CarDetails from './components/carDetails';
import Stocklist from './components/stockList'; // Import the Stocklist component
import carData from './components/carData'; // Import car data
import About from './components/about';
import HomePage from './components/homepage';
import Contact from './components/contact';
import HowToBuy from './components/howtobuy';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Use the imported carData instead of defining it locally
    setCars(carData);
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage cars={cars} />} />
          <Route path="/cars/:id" element={<CarDetails cars={cars} />} />
          <Route path="/stocklist" element={<Stocklist cars={cars} />} /> {/* New route for Stocklist */}
          <Route path="/about" element={<About />} /> {/* New route for About */}
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/howtobuy" element={<HowToBuy />} /> {/* New route for How to Buy */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
