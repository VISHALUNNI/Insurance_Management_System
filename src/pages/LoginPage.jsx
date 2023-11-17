import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import {motion} from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here (e.g., checking credentials)
    if (email === 'user@example.com' && password === 'password123') {
      // Redirect to the user's dashboard or another page on successful login
      // Instead of using useHistory, you can use a link to navigate.
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className='login-container'>
     <div className='img'>
      <h2 className='login-title'>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
      
        <motion.div className="input-container"
         initial={{opacity:0}}
         animate={{opacity:1}}
         transition={{delay:0.5}}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>
        <motion.div className="input-container"
         initial={{opacity:0}}
         animate={{opacity:1}}
         transition={{delay:0.5}}
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </motion.div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className='login-signup-link'>
        New user? <Link to="/signup">Sign up here</Link>
      </p>
      <p className='forgot-password-link'>  
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
    </div>
  );
};

export default LoginPage;
