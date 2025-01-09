import React, { useState, useEffect, useRef } from 'react';

const AgreementForm = ({ agreementType, agreementContent }) => {
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    terms: false,
    agreementType: agreementType,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadyAgreed, setAlreadyAgreed] = useState(false);

  const isMountedRef = useRef(true);

  const fetchUserData = async () => {
    try {
      console.log('Fetching user data and agreement status for:', agreementType);

      // Fetch user profile data
      const response = await fetch(`${apiUrl}/profile.php`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Update form data with user profile
      if (isMountedRef.current) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          fullName: data.full_name,
          email: data.email,
        }));
      }

      // Check if user already agreed to the specific agreement type
      const agreementResponse = await fetch(`${apiUrl}/checkAgreement.php?agreementType=${encodeURIComponent(agreementType)}`, {
        method: 'GET',
        credentials: 'include',
      });

      const agreementData = await agreementResponse.json();
      console.log('Agreement API response:', agreementData);

      if (isMountedRef.current) {
        setAlreadyAgreed(agreementData.already_agreed || false);
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error('Error fetching user data or agreement status:', error);
        setError(error.message);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    setLoading(true);
    fetchUserData();

    return () => {
      isMountedRef.current = false;
    };
  }, [agreementType]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a copy of formData to ensure no circular references
    const formDataCopy = { ...formData };
  
    // Include agreement content in the submission data
    const submissionData = {
      ...formDataCopy,
      agreementType: agreementType,
      agreementContent: agreementContent, // Add agreement content to the data
    };
  
    try {
      const response = await fetch(`${apiUrl}/submitAgreement.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
        credentials: 'include',
      });
  
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred while submitting the form.');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };
  
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="user-agreement-container">
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={alreadyAgreed || isSubmitted}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={alreadyAgreed || isSubmitted}
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            disabled={alreadyAgreed || isSubmitted}
            required
          />
          I agree to the {agreementType}
        </label>
        {!alreadyAgreed && (
          <button type="submit" disabled={isSubmitted}>Submit</button>
        )}
      </form>

      {alreadyAgreed && <p className="success">You have already agreed to the {agreementType}.</p>}
      {isSubmitted && !alreadyAgreed && <p className="success">Thank you for agreeing to the {agreementType}.</p>}
    </div>
  );
};

export default React.memo(AgreementForm);
