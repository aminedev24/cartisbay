import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/login.css';
import useCheckScreenSize from './screenSize';
import { useUser } from './userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const { isPortrait, isSmallScreen } = useCheckScreenSize();
  const { user, loading, login } = useUser();

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    if (!loading && user) {
      // Redirect to homepage if user is logged in
      const timeoutId = setTimeout(() => {
        navigate('/'); // Redirect after 2 seconds
      }, 2000);

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    }
  }, [loading, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      if (response.status === 'success') {
        setMessage(`Welcome, ${response.user.name || email}!`); // Display welcome message
        setMessageType('success');
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
    <div
      className="login-form-wrapper"
      style={{
        height: isSmallScreen ? '90vh' : '',
        display: isSmallScreen ? 'flex' : '',
        alignItems: isSmallScreen ? 'center' : '',
      }}
    >
      <div
        className="login-container"
        style={{
          scale: isSmallScreen ? '2.5' : '',
        }}
      >
        {user ? (
          <p>{message}</p>
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
              <Link to="/forgot-password">Forgot Password?</Link> {/* Forgot password link */}
            </div>
            {message && <p className={`message ${messageType}`}>{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
