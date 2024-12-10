import React, { useState } from 'react';
import { countries } from './countries';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import useCheckScreenSize from './screenSize';
import SignupForm from './registerForm';
const RegisterForm = () => {
  const {isPortrait, isSmallScreen} = useCheckScreenSize();
  return (
    <div className='register-wrapper'>
    <div 
      className="register-container"
      style={{
        height: isSmallScreen ? '90vh' : '',
      }}  
    >
      <div 
        className="account-container"
        style={{
          scale: isSmallScreen && isPortrait ? '2.5' : isSmallScreen ? '1' : '', // Set scale based on both conditions
          width: isSmallScreen && isPortrait ? '24%': isSmallScreen ? '50%' : '',
          margin: isSmallScreen ? '0 auto':  '',
          
         
        }}
      >
        <div className="header">
          <span className="person-icon">
            <i className="fas fa-user-plus"></i>
          </span>
          <h2>Create an Account</h2>
        </div>

        <SignupForm />
      </div>
      </div>
    </div>
  );
};

export default RegisterForm;
