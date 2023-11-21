// Import necessary dependencies
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "./config/SupabaseClient";
import './app.css';
import Home from './pages/Home'
import PolicyPage from './pages/PolicyPage';
import ClaimsPage from "./pages/ClaimsPage";
import HealthInsurancePage from "./pages/HealthInsurancePage";
import VehicleInsurancePage from "./pages/VehicleInsurancePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import CreateProfilePage from "./pages/CreateProfile/CreateProfilePage";
import Dashboard from "./pages/DashBoard";
import ResetPasswordPage from "./pages/ResetPassword";
import UpdateProfilePage from "./pages/UpdateProfile/UpdateProfilePage";
import logo1 from './logo1.png';
import PurchasePolicyPage from "./pages/PurchasePolicyPage";

function NavbarAuthenticated({ onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    // Redirect to the profile update page
    setShowDropdown(false);
    navigate('/profile-update');
  };

  const handleLogout = async () => {
    // Logout user using Supabase
    const { error } = await supabase.auth.signOut();
    setShowDropdown(false);
    onLogout(); // Call the provided onLogout function to update user state
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="logo">
        <img src={logo1} alt='logo' className="company"/>
        </div>
        <Link to="/">Home</Link>
        <Link to="/claims">Manage Claims</Link>
        <Link to="/purchase-policy">Purchase Insurance</Link>
        <Link to="/dashboard">Dashboard</Link>
        <div className="navbar-profile">
          <button className="profile-icon" onClick={toggleDropdown}>
          </button>
          {showDropdown && (
            <div className="profile-dropdown">
              <button onClick={handleUpdateProfile}>Update Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      
    </>
  );
}

function NavbarDefault() {
  return (
    <>
      <div className="logo">
        <img src={logo1} alt='logo' className="company"/>
      </div>
      <Link to="/">Home</Link>
      <Link to="/claims">Manage Claims</Link>
      <Link to="/policies">Manage Policies</Link>
      <Link to="/login">Login / Sign Up</Link>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchUser();
  }, [user]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        {user ? (
          <NavbarAuthenticated onLogout={handleLogout} />
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
        <Route path="/profile-update" element={<UpdateProfilePage/>}/>
        <Route path="/purchase-policy" element={<PurchasePolicyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
