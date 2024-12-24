import React, { useEffect, useState } from "react";
import "../css/profile.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import useCheckScreenSize from './screenSize';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { isSmallScreen, isPortrait } = useCheckScreenSize();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/profile.php`, {
          method: "GET",
          credentials: "include", // Include credentials (cookies)
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUser(data);
        setFormData({
          name: data.full_name,
          country: data.country,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  //console.log(user)

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login"); // Redirect to login if user is not logged in
    }
  }, [loading, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/update_profile.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setUser(data); // Update user state with new data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="profile-wrapper">
        <div className="profile-container">Loading...</div>
      </div>
    );
  }

  // If user is not logged in, navigate to login
  if (!user) {
    return null; // Prevent rendering anything if user is not logged in
  }

  return (
    <div 
      className="profile-wrapper"
      style={{
        height: isSmallScreen ? '90vh': ''
      }}
    >
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile Page</h1>
          <button className="cta-btn" onClick={handleEditToggle}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="profile-details">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
          
              <label>
                Country:
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <div className="profile-details">
            <p>joined date: {new Date(user.joined_date).toLocaleDateString()}</p>
            <p>Name: {user.full_name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Country: {user.country}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
