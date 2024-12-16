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
    <div className="register-banner">
      <img src={`${process.env.PUBLIC_URL}/images/homepage/register002.png`} />
      <Link to='/login'><button className="sign-in-btn">sign in</button></Link>
      <Link to='register'><button className="register-btn">register</button></Link>
    </div>   
    </>
  ) : (
    <>
     <div className="welcome-banner">
      
       <h2>welcome {`${user.name}`}</h2>
       <img src={`${process.env.PUBLIC_URL}/images/homepage/register112.png`} />
    </div>
      
    </>
  )}


  <div className="shipment-banner"><img src={`${process.env.PUBLIC_URL}/images/homepage/shipping2.png`} /></div>
  
  </div>
</div>
    </>
  );
};

export default RightSidebar;
