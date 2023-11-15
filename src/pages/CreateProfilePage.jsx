import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import supabase from "./config/SupabaseClient";

const CreateProfilePage = () => {
   const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleCreateProfile = async (e) => {
    e.preventDefault();
  
    // Simple validation
    if (!firstName || !lastName || !dateOfBirth || !sex || !address || !phoneNumber) {
      setError('Please fill in all required fields.');
      return;
    }
  
    try {
      // Get the current user
      
    const { data: { user } } = await supabase.auth.getUser()
      // Save the profile data to the Supabase database
      const { data, error } = await supabase.from('customer').insert([
        {
          user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          sex,
          address,
          phone_number: phoneNumber,
        },
      ]).select();
  
      if (error) {
        throw error;
      }
  
      // Redirect to the user dashboard after successful profile creation
      navigate("/dashboard");
    } catch (error) {
      setError('Error creating profile. Please try again later.');
      console.error('Error creating profile:', error.message);
    }
  };
  
  


  return (
    <div>
      <h2>Create Your Profile</h2>
      <form onSubmit={handleCreateProfile}>
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
        <button type="submit">Create Profile</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateProfilePage;
