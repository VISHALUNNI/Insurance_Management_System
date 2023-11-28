import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import supabase from './config/SupabaseClient'
import './app.css';
import AuthProvider from './contexts/authContext';
import { NavbarAuthenticated,NavbarDefault } from './navbar/Navbar';import { useAuth } from './contexts/authContext';
import {
  Home, PolicyPage, ClaimsPage, HealthInsurancePage, VehicleInsurancePage, LoginPage, SignupPage, ForgotPasswordPage,
  CreateProfilePage, Dashboard, AdminDashboard, AdminRoute, PaymentSuccessPage, PurchasePolicyPage,
  PurchaseDetailsPage, UpdateProfilePage, ResetPasswordPage
} from './pages'




const App = (() => {
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

export default App;
