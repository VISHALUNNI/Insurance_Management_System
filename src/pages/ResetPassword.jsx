// ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient';
import './ResetPassword.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get the reset token from the URL params
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Use the reset token to update the user's password
      const { data, error } = await supabase.auth.api.updateUser(token, {
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      // Update the user table with the new password
      const { data: userData, error: userError } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', data.id);

      if (userError) {
        throw userError;
      }

      // Display success message and navigate to login page
      setSuccessMessage('Password reset successfully!');
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error.message);
      // Display error message if there's an issue with resetting the password
      setErrorMessage('Error resetting password. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='reset-password-container'>
      <h2 className='reset-password-title'>Reset Password</h2>
      <form onSubmit={handleResetPassword} className='reset-password-form'>
        <div className='reset-password-input-container'>
          <input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Reset Password</button>
      </form>
      {successMessage && <p className='success-message'>{successMessage}</p>}
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
};

export default ResetPasswordPage;
