import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import supabase from './config/SupabaseClient'
import './app.css';
//import AuthProvider from './context/AuthContext';

import {
  Home, PolicyPage, ClaimsPage, HealthInsurancePage, VehicleInsurancePage, LoginPage, SignupPage, ForgotPasswordPage,
  CreateProfilePage, Dashboard, AdminDashboard, AdminRoute, PaymentSuccessPage, PurchasePolicyPage,
  PurchaseDetailsPage, UpdateProfilePage, ResetPasswordPage
} from './pages'

import logo1 from './logo1.png';

const NavbarAuthenticated = React.memo(({ onLogout, isAdmin }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    setShowDropdown(false);
    navigate('/profile-update');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    setShowDropdown(false);
    onLogout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="logo">
        <img src={logo1} alt='logo' className="company" />
      </div>
      <Link to="/">Home</Link>
      <Link to="/claims">Manage Claims</Link>
      {isAdmin ? (
        <Link to="/admin-dashboard">Admin Dashboard</Link>
      ) : (
        <Link to="/dashboard">Dashboard</Link>
      )}
      <Link to="/purchase-policy">Purchase Insurance</Link>
      <div className="navbar-profile">
        <button className="profile-icon" onClick={toggleDropdown}></button>
        {showDropdown && (
          <div className="profile-dropdown">
            <button onClick={handleUpdateProfile}>Update Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </>
  );
});


NavbarAuthenticated.displayName = 'NavbarAuthenticated';
const NavbarDefault = React.memo(() => {
  return (
    <>
      <div className="logo">
        <img src={logo1} alt='logo' className="company" />
      </div>
      <Link to="/">Home</Link>
      <Link to="/claims">Manage Claims</Link>
      <Link to="/policies">Manage Policies</Link>
      <Link to="/login">Login / Sign Up</Link>
    </>
  );
});
NavbarDefault.displayName = 'NavbarDefault';
const App = React.memo(() => {
  {/*const [user, setUser] = useState(null);
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
*/}
  return (
    <BrowserRouter>
      <nav className="navbar">
        {user ? (
          <NavbarAuthenticated onLogout={handleLogout} isAdmin={isAdmin} />
        ) : (
          <NavbarDefault />
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/claims" element={<ClaimsPage />} />
        <Route path="/policies" element={<PolicyPage />} />
        <Route path="/health-insurance" element={<HealthInsurancePage />} />
        <Route path="/vehicle-insurance" element={<VehicleInsurancePage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile-update" element={<UpdateProfilePage />} />
        <Route path="/purchase-policy" element={<PurchasePolicyPage />} />
        <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
        <Route path="/purchase-details" element={<PurchaseDetailsPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />

      </Routes>
    </BrowserRouter>
  );
});
App.displayName = 'App';
export default App;
