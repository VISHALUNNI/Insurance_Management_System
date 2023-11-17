import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import supabase from "./config/SupabaseClient";
import './login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in using Supabase Auth
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Redirect to the user's dashboard on successful login
      navigate("/dashboard")
    } catch (error) {
      setErrorMessage('Invalid email or password');
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <div className='login-container'>
      <h2 className='login-title'>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
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
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className='login-nav-links'>
        New user? <Link to="/signup">Sign up here</Link>
      </p>
      <p className='login-nav-links'>  
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default LoginPage;
