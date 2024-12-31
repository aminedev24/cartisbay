import React, { useState, useEffect } from 'react';
import { 
  useNavigate, 
  useParams 
} from 'react-router-dom';
import useCheckScreenSize from './screenSize';
import Settings from './settings';
import Privacy from './privacy';
import TermsConditions from './terms';
import AntiSocialPolicy from './asf';
import '../css/profilePage.css';
import BankInformation from './bankInfo';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { section } = useParams(); // Get URL param
  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    company: '',
    address: ''
  });

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  // Menu items configuration
  const menuItems = [
    { 
      key: 'settings', 
      label: 'Settings', 
      component: Settings 
    },
    { 
      key: 'inquiries', 
      label: 'Inquiries', 
      component: null 
    },
    { 
      key: 'purchase-history', 
      label: 'Purchase History', 
      component: null 
    },
    { 
      key: 'privacy', 
      label: 'Privacy', 
      component: Privacy 
    },
    { 
      key: 'terms', 
      label: 'Terms & Conditions', 
      component: TermsConditions 
    },
    { 
      key: 'anti-social-policy', 
      label: 'Anti-Social Forces Policy', 
      component: AntiSocialPolicy 
    },
    { 
      key: 'sales-contract', 
      label: 'Sales Contract', 
      component: null 
    },
  ];

  // Determine active content based on URL or default to settings
  const [activeContent, setActiveContent] = useState(
    section && menuItems.some(item => item.key === section) 
      ? section 
      : 'settings'
  );

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/profile.php`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUser(data);
        setFormData({
          name: data.full_name,
          country: data.country,
          company: data.company,
          address: data.address
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  // Handle URL and invalid sections
  useEffect(() => {
    // If section is in URL but not valid, redirect to settings
    if (section && !menuItems.some(item => item.key === section)) {
      navigate('/profile/settings', { replace: true });
      setActiveContent('settings');
    }
  }, [section, navigate]);

  // Handle menu item selection
  const handleMenuClick = (item) => {
    setActiveContent(item.key);
    navigate(`/profile/${item.key}`, { replace: true });
  };

  // Render loading state
  if (loading) {
    return (
      <div className="profile-wrapper">
        <div className="profile-container">Loading...</div>
      </div>
    );
  }

  // If user is not logged in, return null
  if (!user) {
    return null;
  }

  // Find the active component
  const ActiveComponent = menuItems.find(
    item => item.key === activeContent
  )?.component || Settings;
console.log(activeContent)
  return (
    <div className="profile-wrapper">
    <div 
      className="profile-container"
   
    >
      <div className="profile-sidebar">
        <div className='profile-sidebar-menus'>
          <h2>MENU</h2>
          <ul>
            {menuItems.map((item) => (
              <li 
                key={item.key}
                onClick={() => handleMenuClick(item)}
                className={activeContent === item.key ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div className="amount">
            <p><strong>Total Guaranty:</strong> $2,014</p>
            <p><strong>Total Expensive Guaranty:</strong> $2,014</p>
            <p><strong>Spending Amount:</strong> ¥1,042,063</p>
          </div>
        </div>
       
      </div>
      <div 
        className="profile-content"
        style={{
          height: isSmallScreen && activeContent == 'terms' || isSmallScreen && activeContent == 'privacy' ? '70vh' : "90vh"
        }}  
      >
        <ActiveComponent 
          user={user} 
          setUser={setUser}
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;