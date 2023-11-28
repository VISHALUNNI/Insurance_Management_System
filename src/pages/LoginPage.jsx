import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient';
import './login.css';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const LoginPage = ({ onLogin }) => {
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

      // Fetch user data from the user table to check the role
      const { data, error: userError } = await supabase
        .from('users') // Replace 'user' with your actual user table name
        .select('email, role') // Fetch email and roles
        .eq('email', email)
        .single();
      console.log(data)
      if (userError) {
        throw userError;
      }

      // Check if the user has the 'admin' role
      if (data && data.role && data.role.includes('admin')) {
        // If the user is an admin, navigate to the admin dashboard
        navigate('/admin-dashboard');
        window.location.reload();
      } else {
        // If not an admin, proceed with regular user login
        onLogin(user);
        navigate('/dashboard');
        window.location.reload();
      }
    } catch (error) {
      alert('Invalid email or password');
      setErrorMessage('Invalid email or password');
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <div className='login-container'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className='img'>
          <h2 className='login-title'>Login</h2>
          <form onSubmit={handleLogin} className='login-form'>
            <div className="input-container" style={{ marginBottom: '10px' }}>
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
      </motion.div>
    </div>
  );
};



export default LoginPage;
