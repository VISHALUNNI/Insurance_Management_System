// Import necessary libraries
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './ForgotPassword.css'; // Import the CSS file
import supabase from "../../config/SupabaseClient";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      // Send reset password email
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://imsappp.vercel.app/#/reset-password',
});

      if (error) {
        throw error;
      }

      // Display success message and navigate to login page
      setSuccessMessage('Password reset email sent. Check your inbox.');
      setErrorMessage('');
      navigate(`/login`);
    } catch (error) {
      console.error(error);
      // Display error message if there's an issue with sending the reset password email
      setErrorMessage('Error sending reset password email. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='forgot-password-container'>
      <h2 className='forgot-password-title'>Forgot Password</h2>
      <form onSubmit={handleForgotPassword} className='forgot-password-form'>
        <div className="forgot-password-input-container">
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="forgot-password-nav-links">
        <p>
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
