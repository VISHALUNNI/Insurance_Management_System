import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../config/SupabaseClient';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('email, role')
          .eq('email', data.user.email)
          .single();
        setUser(userData);
        setIsAdmin(userData.role === 'admin');
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
  };
  const AuthContextValue = {
    user,
    handleLogin,
    handleLogout
    //role,
  };

  return (
    <AuthContext.Provider value={{AuthContextValue}}>
      {children}
    </AuthContext.Provider>
  );
};

