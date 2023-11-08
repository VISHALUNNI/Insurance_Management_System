import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css'

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your user registration logic here (e.g., creating a new account)
    // If registration is successful, you can navigate to a success page.
    // Instead of using useHistory, you can use a link to navigate.
    // If registration fails, you can display an error message.
  };

  return (
    <div className='signup-container'>
      <h2 className='signup-title'>Sign Up</h2>
      <form onSubmit={handleSignup} className='signup-form'>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="nav-links">
      <p className='signup-login-link'>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <p>
        <Link to="auth/forgot-password">Forgot Password?</Link>
      </p>
      </div>
    </div>
  );
};

export default SignupPage;
