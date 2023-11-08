import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './login.css'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Add forgot password logic here (e.g., sending a reset link to the user's email)
    console.log('Forgot password for email:', email);
  };

  return (
    <div className='login-container'>
      <h2 className='login-title'>Forgot Password</h2>
      <form onSubmit={handleForgotPassword} className='login-form'>
        <div className="input-container">
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
      <div className="nav-links">
      <p>
        Remember your password? <Link to="/login">Login</Link>
      </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
