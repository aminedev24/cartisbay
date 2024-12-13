import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Flag to prevent multiple submissions

  // Dynamically set API URL based on environment
  const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'  // Development URL
    : '/server';  // Production URL (relative path)

    const login = async (email, password) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
    
      try {
        const formData = new URLSearchParams();
        formData.append("email", email);
        formData.append("password", password);
    
        const response = await fetch(`${apiUrl}/login.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Prevent preflight
          },
          body: formData.toString(), // Use URL-encoded body
          credentials: "include",
        });
    
        const data = await response.json();
        if (data.status === "success") {
          setUser(data.user);
          Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
        } else {
          console.error(data.message);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error logging in:", error);
      } finally {
        setIsSubmitting(false);
      }
    };
    
  // Function to handle user logout
  const logout = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Disable the button while submitting

    try {
      const response = await fetch(`${apiUrl}/logout.php`, {
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
        //window.location.reload(); // Reload the page to reflect logout
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsSubmitting(false); // Re-enable the button after the request completes
    }
  };

  // Check login status on component mount (page reload)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${apiUrl}/check_session.php`, {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent
        });

        const data = await response.json();
        if (data.status === 'success') {
          setUser(data.user); // Set user from session
          Cookies.set('user', JSON.stringify(data.user), { expires: 7 }); // Update the cookie
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false); // Set loading to false once the session check is complete
      }
    };

    checkSession();
  }, []); // Empty dependency array ensures this effect runs only once

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
