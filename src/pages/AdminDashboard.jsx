import React, { useEffect, useState } from 'react';
import supabase from '../config/SupabaseClient';

const AdminDashboard = () => {
  const [nonAdminUsers, setNonAdminUsers] = useState([]);

  useEffect(() => {
    // Fetch non-admin users from the Supabase database
    const fetchNonAdminUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .neq('role', 'admin'); // Assuming 'role' is a column indicating user role

        if (error) {
          throw error;
        }

        setNonAdminUsers(data);
      } catch (error) {
        console.error('Error fetching non-admin users:', error.message);
      }
    };

    fetchNonAdminUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            {/* Add more columns based on user attributes */}
          </tr>
        </thead>
        <tbody>
          {nonAdminUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              {/* Add more cells based on user attributes */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
