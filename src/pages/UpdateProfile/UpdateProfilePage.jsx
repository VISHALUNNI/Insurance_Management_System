import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/SupabaseClient';
import './UpdateProfilePage.css';

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the current user
        const { data: user, error } = await supabase.auth.getUser();
        //console.log(user.user)
        if (error) {
          throw error;
        }

        // Fetch existing profile data if available
        const { data: profileData } = await supabase
          .from('customer')
          .select('*')
          .eq('user_id', user.user.id);
        console.log(profileData)
        if (profileData) {
          setFirstName(profileData[0].first_name || '');
          setLastName(profileData[0].last_name || '');
          setDateOfBirth(profileData[0].date_of_birth || '');
          setSex(profileData[0].sex || '');
          setAddress(profileData[0].address || '');
          setPhoneNumber(profileData[0].phone_number || '');
          setId(profileData[0].id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!firstName || !lastName || !dateOfBirth || !sex || !address || !phoneNumber) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      // Get the current user
      const { data: user } = await supabase.auth.getUser();

      // Save the updated profile data to the Supabase database
      const { data, error } = await supabase
        .from('customer')
        .update([
          {
            user_id: user.user.id,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            sex,
            address,
            phone_number: phoneNumber,
          },
        ])
        .eq("id",id);

      if (error) {
        throw error;
      }

      // Redirect to the user dashboard after successful profile update
      navigate('/dashboard');
    } catch (error) {
      setError('Error updating profile. Please try again later.');
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <div className="create-profile-container">
      <h2 className="create-profile-title">Update Your Profile</h2>
      <form onSubmit={handleUpdateProfile} className="create-profile-form">
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="sex">Sex:</label>
          <select
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateProfilePage;
