import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './signup.css';
import supabase from "../config/SupabaseClient";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const Navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signUp({
        username,
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        // Sign in after successful signup
        const { user: loginUser, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          console.error('Error signing in:', loginError.message);
        } else {
          // After successful signup and login, create a user profile
          await createProfileInDatabase({ username, email, password });

          // Navigate to the create profile page
          Navigate('/create-profile');

          // Provide user feedback or redirect to a new page
          alert('Signup successful! Check your email for verification.');
        }
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const createProfileInDatabase = async ({ username, email, password }) => {
    // Your logic to create a user profile in the database
    // For example, you can use supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        { username, email, password },
      ])
      .select();

    if (error) {
      console.error('Error creating user profile:', error.message);
    } else {
      console.log('User profile created successfully:', data);
    }
  };

  return (
    <div className='signup-container'>
      <h2 className='signup-title'>Sign Up</h2>
      <form onSubmit={handleSignup} className='signup-form'>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
