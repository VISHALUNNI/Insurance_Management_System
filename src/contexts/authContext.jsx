import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../config/SupabaseClient';

export const AuthContext = createContext();

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

          if (userError) {
            throw userError;
          }
        console.log(userData,isAdmin)
        setUser(userData);
        setIsAdmin(userData.role === 'admin'); 
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
      const { data, error: userError } = await supabase
        .from('users')
        //.select()
        .select('email, role')
        .eq('email', email)
        .single();

      if (userError) {
        throw userError;
      }
      setUser(data);
      setIsAdmin(data?.role === 'admin');
      return data;
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error; 
    }
  };

  const onLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const AuthContextValue = {
    user,
    handleLogin,
    onLogout,
    isAdmin
    //role,
  };

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

