import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import supabase from "../config/SupabaseClient";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const Navigate = useNavigate();
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }


    try {
      const { user, error } = await supabase.auth.signUp({
        username,
        email,
        password,
      }); 

      if (error) {
        setErrorMessage(error.message);
      } else {
        const { user: loginUser, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          console.error('Error signing in:', loginError.message);
        } else {
          // After signing up and signing in, you can perform additional actions
          // For example, create a user profile in the database
          await createProfileInDatabase({ username, email, password });

          // Navigate to the desired page or perform other actions
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
    try {
      const { data:{user}, error1 } = await supabase.auth.getUser();

      if (!user || error1) {
        console.error('Error getting user information:', error1 ? error1.message : 'No authenticated user');
        // Handle the error, e.g., redirect to login page or show an error message
        return;
      }

      console.log(user)

      if (!user) {
        console.error('User not authenticated');
        // Handle the case where the user is not authenticated
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: user.id,
            username,
            email,
            password,
            role: "user"
          },
        ])
        .select();

      if (error) {
        console.error('Error creating user profile:', error.message);
      } else {
        console.log('User profile created successfully:', data);
      }
    } catch (error) {
      console.error('Error creating user profile:', error.message);
    }
  };

  return (
    <div>
      <div className='sg'>
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
    </div>
    </div>
  );
};

export default SignupPage;
