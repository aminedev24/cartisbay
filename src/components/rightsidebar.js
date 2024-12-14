import React from "react";
import SignupForm from "./registerForm"; // Import the SignupForm component
import { useUser } from "./userContext"; // Import useUser  hook
import "../css/RightSidebar.css";
import { Link } from "react-router-dom";
const RightSidebar = () => {
  const { user, logout } = useUser(); // Access user and logout from context
  return (
    <>
  <div className="right-sidebar">
  <div className="account-container">
  {!user ? (
    <>
     
      <Link to='register'><div className="register-banner"></div></Link>
    </>
  ) : (
    <>
     <div className="welcome-banner">
       <h2>welcome {`${user.name}`}</h2>
    </div>
      
    </>
  )}

<div className="shipment-banner">

</div>
  
  
  </div>
</div>
    </>
  );
};

export default RightSidebar;
