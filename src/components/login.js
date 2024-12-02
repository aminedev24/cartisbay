import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook for redirection
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    if (localStorage.getItem('session_token')) {
      // If the session token exists, redirect to homepage
      navigate('/'); // Redirect to homepage (or wherever you want)
      window.location.reload()
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('../../server/login.php', { // Pointing to the correct endpoint
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (data.status === 'success') {
        // Storing session token and user data in localStorage (or cookies)
        localStorage.setItem('session_token', data.session_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setIsLoggedIn(true);
        setMessage(`Welcome, ${data.user.name}!`);

        // Redirect to homepage after successful login
        navigate('/'); // Redirect to homepage
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-container'>
      {isLoggedIn ? (
        <p>{message}</p>
      ) : (
        <form className='login-form' onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className={email ? 'float' : ''}>Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className={password ? 'float' : ''}>Password</label>
          </div>
          <button type="submit" className="login-button">Login</button>
          {message && <p className="message">{message}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;
