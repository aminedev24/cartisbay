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
  const [isReadOnly, setIsReadOnly] = useState(false); // State to track read-only status

  const isMountedRef = useRef(true);

  const fetchUserData = async () => {
    try {
      console.log('Fetching user data and agreement status for:', agreementType);

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

      if (isMountedRef.current) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          fullName: data.full_name,
          email: data.email,
        }));
        setIsReadOnly(true); // Set read-only status to true after data is fetched
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error('Error fetching user data:', error);
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

    const submissionData = {
      ...formData,
      agreementType: agreementType,
      agreementContent: agreementContent,
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
            readOnly={isReadOnly} // Input becomes read-only based on state
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
            readOnly={isReadOnly} // Input becomes read-only based on state
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          I agree to the {agreementType}
        </label>
        <button type="submit" disabled={isSubmitted}>Submit</button>
      </form>

      {isSubmitted && <p className="success">Thank you for agreeing to the {agreementType}.</p>}
    </div>
  );
};

export default React.memo(AgreementForm);