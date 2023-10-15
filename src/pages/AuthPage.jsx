import React, { useState } from 'react';
import './AuthPage.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here.
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="links-container">
          <a href="/auth/signup" className="auth-link">New user? Sign up here</a>
          <a href="/auth/forgot-password" className="auth-link">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
