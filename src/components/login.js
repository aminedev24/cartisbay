import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../css/login.css';
import useCheckScreenSize from './screenSize';
import { useUser } from './userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { isSmallScreen, isPortrait } = useCheckScreenSize();
  const { user, loading, login } = useUser();

  // Redirect if the user is already logged in when the component mounts
  useEffect(() => {
    if (!loading && user) {
      // Set a welcome message for already logged-in users
      setMessage(`Welcome back, ${user.name || user.email}!`);
      setMessageType('success');

      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);

      // Redirect to the previous location or homepage after 2 seconds
      const from = location.state?.from || '/'; // Use the previous location or fallback to homepage
      console.log('User already logged in, redirecting to:', from);

      const timeoutId = setTimeout(() => {
        navigate(from);
      }, 2000); // Redirect after 2 seconds

      // Cleanup the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [loading, user, navigate, location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      if (response.status === 'success') {
        // Set the welcome message
        setMessage(`Welcome, ${response.user.name || email}!`); // Display welcome message
        setMessageType('success');

        // Clear the message after 5 seconds
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000); // Message disappears after 5 seconds

        // Debugging: Check location state
        console.log('Location state:', location.state?.from);

        // Redirect to the previous location or homepage after 2 seconds
        const from = location.state?.from || '/'; // Default to homepage if no previous location
        console.log('Redirecting to:', from); // Should log "/invoice"

        setTimeout(() => {
          navigate(from);
        }, 2000); // Redirect after 2 seconds
      } else {
        throw new Error(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-form-wrapper">
      <div
        className="login-container"
      
      >
        <img src={`${process.env.PUBLIC_URL}/images/logo3new.png`} alt="Logo" className="logo-form" />
        <div className='header'>
          <h2>Login</h2>
        </div>

        {user ? (
          <p className='welcome-message'>{message}</p>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className={email ? 'float' : ''}>
                Email
              </label>
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className={password ? 'float' : ''}>
                Password
              </label>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <div className="forgot-password-link">
              <Link className='cta-link' to="/forgot-password">Forgot Password?</Link>
            </div>
            {message && <p className={`message ${messageType}`}>{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;