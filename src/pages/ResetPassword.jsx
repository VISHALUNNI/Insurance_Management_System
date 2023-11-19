// ResetPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient';
import './ResetPassword.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [hash, setHash] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If the user doesn't have an access token
      if (!hash) {
        console.error('Sorry, Invalid token');
        return;
      }

      const hashArr = hash
        .substring(1)
        .split('&')
        .map((param) => param.split('='));
      console.log(hashArr)
      let type;
      let accessToken;
      for (const [key, value] of hashArr) {
        if (key === 'type') {
          type = value;
        } else if (key === 'access_token') {
          accessToken = value;
        }
      }

      if (type !== 'recovery' || !accessToken || typeof accessToken === 'object') {
        console.error('Invalid access token or type');
        return;
      }

      // Change the password using supabase.auth.updateUser
      const { user, error: passwordUpdateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (passwordUpdateError) {
        throw passwordUpdateError;
      }
      const { data } = await supabase.auth.getUser()
      const user1 = data.user
      console.log(user1)
      const { error: updateError } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', user1.id);

      if (updateError) {
        throw updateError;
      }

      console.log('Password Changed successfully');

      // Navigate to the login page after successful password change
      navigate('/login');
    } catch (error) {
      console.error('Sorry, an error occurred:', error.message);
    }
  };

  return (
    <div className='reset-password-container'>
      <h2 className='reset-password-title'>Reset Password</h2>
      <form onSubmit={(e) => handleSubmit(e)} className='reset-password-form'>
        <div className='reset-password-input-container'>
          <input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
