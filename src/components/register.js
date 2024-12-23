import React, { useState } from 'react';
import { countries } from './countries';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import useCheckScreenSize from './screenSize';
import SignupForm from './registerForm';
import TermsAndConditions from "./terms";

const RegisterForm = () => {
  const {isPortrait, isSmallScreen} = useCheckScreenSize();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  return (
    <div className='register-wrapper'>
    <div 
      className="register-container"
    
    >
      <div 
        className="account-container"
        style = {{
             scale: isSmallScreen && isPortrait ? '1.3': ''
        }}
      >
        <div className="header">
          <span className="person-icon">
            <i className="fas fa-user-plus"></i>
          </span>
          <h2>Create an Account</h2>
        </div>

        <SignupForm setIsModalOpen={setIsModalOpen} />
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <TermsAndConditions />
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default RegisterForm;
