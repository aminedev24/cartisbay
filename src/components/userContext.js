import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // No user data in cookies
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API URL setup
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server/server'
      : '/server';

  // Login Function
  const login = async (email, password) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch(`${apiUrl}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        credentials: 'include', // Important for session cookies
      });

      const data = await response.json();
      if (data.status === 'success') {
        // Set only token, avoid storing user details in cookies
        Cookies.set('session_token', data.token, {
          expires: 7,
          secure: true, // Only over HTTPS
          sameSite: 'Strict',
        });
        setUser(data.user); // Set user locally in state
      } else {
        console.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logout Function
  const logout = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/logout.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUser(null);
        Cookies.remove('session_token'); // Remove the session token
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check User Session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${apiUrl}/check_session.php`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        console.log(data.user)
        if (data.status === 'success') {
          setUser(data.user); // Set user from validated backend session
        } else {
          Cookies.remove('session_token'); // Ensure no invalid tokens remain
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
