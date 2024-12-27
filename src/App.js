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
//import HowToBuy from './components/howtobuy';
import LeftSidebar from './components/sidebar'; // Import the LeftSidebar
import './css/App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarDismantling from './components/carDismantling';
import UsedTires from './components/usedTires';
import HelpPage from './components/help';
import InquiryForm from './components/vehiculeEnquiry';
import RegisterForm from './components/register';
import { UserProvider } from './components/userContext';
import Login from './components/login';
import { useLocation } from 'react-router-dom';
import ResetPassword from './components/resetPassword';
import ForgotPassword from './components/forgotPassword';
import ProfilePage from './components/profile2';
import Shipping from './components/shipping';
import ProformaInvoiceForm from './components/invoiceForm'
/* src/index.css */


function App() {
  
  const [bodyWidth, setBodyWidth] = useState(window.screen.width);


  /*
  useEffect(() => {
    const updateWidth = () => setBodyWidth(window.screen.width);

    window.addEventListener("resize", updateWidth);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    document.body.style.minWidth = `${bodyWidth -30}px`;
    console.log(bodyWidth)
  }, [bodyWidth]);
*/
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

  useEffect(() => { const images = document.querySelectorAll('img'); images.forEach(img => { img.setAttribute('loading', 'lazy'); }); }, []);

  
  return (
    <UserProvider>
    <Router>
      <Header />

        
        <Routes>
          <Route path="/" element={<HomePage cars={cars} />} />
          <Route path="/cars/:id" element={<CarDetails cars={cars} />} />
          <Route path="/stocklist" element={<Stocklist cars={cars} filters={filters} />} /> {/* Pass filters to Stocklist */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/*<Route path="/howtobuy" element={<HowToBuy />} />*/}
          <Route path="/car-dismantling" element={<CarDismantling />} />
          <Route path="/used-tires" element={<UsedTires />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/vehicleInquiry" element={<InquiryForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Token in URL */}
          <Route path="/profile/:section?" element={<ProfilePage />} />
          <Route path='/shipping' element={<Shipping />}></Route>
          <Route path = '/invoice' element = {<ProformaInvoiceForm />}></Route>
          </Routes>
      <Footer />
    </Router>
    </UserProvider>
  );
}

export default App;
