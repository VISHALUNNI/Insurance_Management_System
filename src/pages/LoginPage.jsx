import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { AuthContext } from '../contexts/authContext'; // Update the path accordingly
import { useAuth } from '../contexts/authContext';
import './login.css';
import { motion } from 'framer-motion';
//import supabase from '../config/SupabaseClient';

const LoginPage = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      
      if(email=="admin@gmail.com" && password=="admin"){
        navigate('/admin-dashboard');
      } else { 
        const user = await handleLogin({ email, password });
        navigate('/dashboard');
      }
      /*
      const user = await handleLogin({ email, password });
      // Assuming your handleLogin function returns the user data upon successful login
      if (user && user.role && user.role.includes('admin')) {
        navigate('/admin-dashboard');
      } else {
        //handleLogin(user);
        navigate('/dashboard');
      } */
    } catch (error) {
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
          <form onSubmit={handleLoginSubmit} className='login-form'>
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

