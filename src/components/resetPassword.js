import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/forgotPassword.css';

const ResetPassword = () => {
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const token = window.location.hash.split('/')[2]; // Assuming the URL is like "/reset-password/:token"
  //console.log(token);

  const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'
    : '/server';

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/reset_password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      setMessage(data.message);
      setMessageType(data.status);

      // Redirect to homepage or login page after 2 seconds
      const timeoutId = setTimeout(() => {
        navigate('/login'); // Redirect after 2 seconds
      }, 2000);

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm new password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      {message && <p className={`message ${messageType}`}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
