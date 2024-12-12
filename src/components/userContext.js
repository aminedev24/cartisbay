import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null);
  const [loading, setLoading] = useState(true);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await fetch('server/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Ensure cookies are sent and received
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUser(data.user); // Store user data in state
        Cookies.set('user', JSON.stringify(data.user), { expires: 7 }); // Store user data in a cookie for 7 days
      } else {
        console.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      const response = await fetch('server/logout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent for logout
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUser(null);
        Cookies.remove('user'); // Remove user data from cookies
        window.location.reload();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Check login status on component mount (page reload)
  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch('server/check_session.php', {
        method: 'GET',
        credentials: 'include', // Ensure cookies are sent
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUser(data.user); // Set user from session
        console.log(data.user)
        Cookies.set('user', JSON.stringify(data.user), { expires: 7 }); // Update the cookie
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
