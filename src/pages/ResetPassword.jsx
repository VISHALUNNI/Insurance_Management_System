// ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient';
import './ResetPassword.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { token } = useParams(); // Get the reset token from the URL params

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
        const { data:{authResult}, error } = await supabase.auth.updateUser({
            password: newPassword
        });
        const { data, error } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', authResult.data.id);
        

      if (error) {
        throw error;
      }

      // Display success message
      setSuccessMessage('Password reset successfully!');
      setErrorMessage('');
      navigate('/login')
    } catch (error) {
      console.error('Error resetting password:', error.message);
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
