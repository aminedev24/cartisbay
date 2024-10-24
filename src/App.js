import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import CarDetails from './components/carDetails';
import Stocklist from './components/stockList';
import carData from './components/carData'; // Import car data
import About from './components/about';
import HomePage from './components/homepage';
import Contact from './components/contact';
import HowToBuy from './components/howtobuy';
import LeftSidebar from './components/sidebar'; // Import the LeftSidebar

function App() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    location: '',
    searchTerm: '',
  });

  useEffect(() => {
    setCars(carData); // Use the imported carData
  }, []);


  
  return (
    <Router>
      <Header />
      <div className='layout'>
        
        <Routes>
          <Route path="/" element={<HomePage cars={cars} />} />
          <Route path="/cars/:id" element={<CarDetails cars={cars} />} />
          <Route path="/stocklist" element={<Stocklist cars={cars} filters={filters} />} /> {/* Pass filters to Stocklist */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/howtobuy" element={<HowToBuy />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
