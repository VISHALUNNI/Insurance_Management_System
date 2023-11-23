import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient'; // Import your Supabase client configuration

const AdminRoute = ({ element }) => {
  const checkAdminStatus = async () => {
    try {
      // Fetch user data from Supabase
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user data:', error.message);
        return false;
      }

      // Check if the user is an admin (You need to adapt this based on your data structure)
      const isAdmin = data.role === 'admin';

      return isAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error.message);
      return false;
    }
  };

  const isAdmin = checkAdminStatus();

  return isAdmin ? element : <Navigate to="/login" />;
};

export default AdminRoute;
