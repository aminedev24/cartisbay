import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation , useNavigate} from 'react-router-dom';
import { useUser } from './userContext'; // Import useUser hook
import '../css/header.css';
import TopBar from './topbar';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({}); // Object to hold refs for all dropdowns
  const location = useLocation();

  const { user, logout } = useUser();

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleClickOutside = (event) => {
    // Close dropdown if clicked outside any active dropdown
    if (
      activeDropdown &&
      dropdownRefs.current[activeDropdown] &&
      !dropdownRefs.current[activeDropdown].contains(event.target)
    ) {
      event.stopPropagation(); // Prevent bubbling issues
      setActiveDropdown(null);
    }
  };

  const logoutHandler = () => {
    logout();
    setActiveDropdown(null);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = () => {
      // Update the URL with the search keyword
      navigate(`/stocklist?search=${encodeURIComponent(searchKeyword)}`);
  };
  
  const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
          handleSearch();
      }
  };

  return (
    <div className="header-container">
      <TopBar />
      <header className="main-header">
        <div className="header-top">
          <Link className="logo" to="/">
            <img src={`${process.env.PUBLIC_URL}/images/logo3.png`} alt="Logo" />
          </Link>
          <div className="header-search">
            <input
              type="text" 
              placeholder="Search by keyword..." 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}

             />
            <i className="fas fa-search search-icon" onClick={handleSearch}></i>
          </div>
          <div className="header-icons">
            <div className="header-item">
              <Link to="/contact">Contact</Link>
            </div>
            {!user ? (
              <>
                <div className="header-item">
                  <i className="fas fa-user-plus icon"></i> <Link to="/register">Register</Link>
                </div>
                <div className="header-item">
                  <i className="fas fa-user icon"></i>
                  <Link to="/login">Login</Link>
                </div>
              </>
            ) : (
              <div
                className="header-item dropdown"
                ref={(el) => (dropdownRefs.current['profile'] = el)}
                onClick={() => toggleDropdown('profile')}
              >
                <i className="fas fa-user icon"></i> {user.name || 'Profile'}
                <div
                  className={`dropdown-content profile ${
                    activeDropdown === 'profile' ? 'show' : ''
                  }`}
                >
                  <Link to="/profile">Profile</Link>
                  <button onClick={logoutHandler} className="logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="header-bottom">
          <div className="left-links">
            <div className="used-cars">
              <i className="fas fa-car icon"></i>
              <Link to={'/car-dismantling'}>Car dismantling</Link>
            </div>
            <div className="used-tires">
              <i className="fas fa-circle-notch icon"></i>
              <Link to={'/used-tires'}>Used Tires</Link>
            </div>
          </div>

          <div className="right-links">
            <div
              className="nav-item dropdown"
              ref={(el) => (dropdownRefs.current['localServices'] = el)}
              onClick={() => toggleDropdown('localServices')}
            >
              Local Services <span className="arrow">🔽</span>
              <div
                className={`dropdown-content ${
                  activeDropdown === 'localServices' ? 'show' : ''
                }`}
              >
                
                <Link to='local-services/namibiaAgent'>Namibia</Link>
                <a href="#">DR-Congo</a>
                <a href="#">Tanzania</a>
              </div>
            </div>
            <div
              className="nav-item dropdown"
              ref={(el) => (dropdownRefs.current['overview'] = el)}
              onClick={() => toggleDropdown('overview')}
            >
              Help <span className="arrow">🔽</span>
              <div
                className={`dropdown-content help ${
                  activeDropdown === 'overview' ? 'show' : ''
                }`}
              >
                <Link to={'/help?topic=help'}>Help</Link>
                <Link to={'/help?topic=Company%20Profile'}>Company Profile</Link>
                <Link to={'/help?topic=Bank%20Information'}>Bank Information</Link>
                <Link to={'/help?topic=Why%20Choose%20Artisbay%20Inc.'}>
                  Why Choose Artisbay
                </Link>
                <Link to={'/help?topic=Terms%20%26%20Conditions'}>
                  Terms & Conditions
                </Link>
                <Link to={'/help?topic=Anti-Social%20Force%20Policy'}>
                  Anti-Social Force Policy
                </Link>
                <Link to={'/help?topic=How%20to%20Buy%20used%20cars'}>
                  How To Buy
                </Link>
                <Link to={'/help?topic=About%20payement'}>About Payment</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
