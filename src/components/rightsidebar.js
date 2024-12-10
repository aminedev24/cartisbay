import React from "react";
import SignupForm from './registerForm'; // Import the SignupForm component
import { useUser  } from './userContext'; // Import useUser  hook
import '../css/RightSidebar.css';

const RightSidebar = () => {
  const { user, logout } = useUser (); // Access user and logout from context
  return (
    <div className="right-sidebar">
      {!user ? (
        <div className="account-container">
          <div className="header">
            <span className="person-icon">
              <i className="fas fa-user-plus"></i>
            </span>
            <h2>Create an Account</h2>
          </div>
          <SignupForm /> 
        </div>
      ) : (
        <h2>welcome {`${user.name}`}</h2>
      )}
    </div>
  );
};

export default RightSidebar;