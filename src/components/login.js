import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import useCheckScreenSize from './screenSize';
import { useUser  } from './userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const { isPortrait, isSmallScreen } = useCheckScreenSize();
  const { user, loading, login } = useUser ();

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    if (!loading && user) {
      // Redirect to homepage if user is logged in
      const timeoutId = setTimeout(() => {
        navigate('/'); // Redirect after 2 seconds
        window.location.reload();
      }, 4000); // 2000 milliseconds = 2 seconds

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    }
  }, [loading, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); // Use the login function from UserProvider
      setMessage(`Welcome, ${email}!`); // Show a welcome message
      setMessageType('success'); // Set message type to success
      // No need to navigate here; it will be handled in the useEffect
    } catch (error) {
      setMessage('Login failed. Please check your credentials and try again.');
      setMessageType('error'); // Set message type to error
      console.error('Error:', error);
    }
  };

  return (
    <div
      className='login-form-wrapper'
      style={{
        height: isSmallScreen ? '90vh' : '',
        display: isSmallScreen ? 'flex' : '',
        alignItems: isSmallScreen ? 'center' : '',
      }} 
    >
      <div 
        className='login-container'
        style={{
          scale: isSmallScreen ? '2.5' : '',
        }}
      >
        {user ? ( // Check if user is logged in
          <p>{message}</p>
        ) : (
          <form className='login-form' onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className={email ? 'float' : ''}>Email</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className={password ? 'float' : ''}>Password</label>
            </div>
            <button type="submit" className="login-button">Login</button>
            {message && (
              <p className={`message ${messageType}`}>{message}</p> // Add class based on message type
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;