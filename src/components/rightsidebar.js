import React from "react";
import SignupForm from "./registerForm"; // Import the SignupForm component
import { useUser } from "./userContext"; // Import useUser  hook
import "../css/RightSidebar.css";
import { Link } from "react-router-dom";
const RightSidebar = () => {
  const { user, logout } = useUser(); // Access user and logout from context
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
          <div className="image-section">
            <Link to='/register'>
              <img
                src={`${process.env.PUBLIC_URL}/images/homepage/register0.jpeg`}
                alt="register-ad"
              />
            </Link>
            
           
          </div>
        </div>
      ) : (
        <>
          <div className="welcome-banner">
            <h2>welcome {`${user.name}`}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default RightSidebar;
