// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../config/SupabaseClient';

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch admin notifications from Supabase
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase.from('adminnotifications').select('*');
        if (error) {
          console.error('Error fetching admin notifications:', error.message);
          return;
        }
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching admin notifications:', error.message);
      }
    };

    // Call the fetchNotifications function when the component mounts
    fetchNotifications();
  }, []);

  const handleAcknowledge = async (notificationId) => {
    try {
      // Remove the acknowledged notification from Supabase
      await supabase.from('admin_notifications').delete().eq('id', notificationId);
      console.log('Notification acknowledged and removed.');
      const { data: agents, error: agentsError } = await supabase.from('agent').select('*');
      if (agentsError) {
        console.error('Error fetching agents:', agentsError.message);
        return;
      }
  
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
  
      // Notify the user
      console.log(`User assigned to agent ${randomAgent.name}`);
    } catch (error) {
      console.error('Error acknowledging notification:', error.message);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.message} - {notification.timestamp}
            <button onClick={() => handleAcknowledge(notification.id)}>
              Acknowledge
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
