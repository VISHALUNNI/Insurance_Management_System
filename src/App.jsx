import { HashRouter as BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import { useState, useEffect, } from "react";
// pages
import Home from "./pages/Home"
import supabase from "./config/SupabaseClient";
import './app.css'
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
import logo1 from './logo1.png';


function NavbarAuthenticated() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const handleUpdateProfile = () => {
    // Redirect to the profile update page
    setShowDropdown(false);
    navigate('/profile-update');
  };

  const handleLogout = async () => {
    // Logout user using Supabase
    const { error } = await supabase.auth.signOut()
    setShowDropdown(false);
    navigate('/');
  };
    

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="logo">
        
        <img src={logo1} alt='logo' className="company"/>
      
      
      <Link to="/">Home</Link>
      <Link to="/claims">Manage Claims</Link>
      <Link to="/policies">Manage Policies</Link>
      <Link to="/health-insurance">Purchase Health Insurance</Link>
      <Link to="/vehicle-insurance">Purchase Vehicle Insurance</Link>
      <Link to="/dashboard">Dashboard</Link>
      <div className="navbar-profile">
      <div className="profile-icon" onClick={toggleDropdown}>
        {/* You can use an icon here, e.g., user icon */}
        🧑
      </div>
      {showDropdown && (
        <div className="profile-dropdown">
          <button onClick={handleUpdateProfile}>Update Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
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
      {user ? <NavbarAuthenticated /> : <NavbarDefault />}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/claims" element={<ClaimsPage/>}/>
        <Route path="/policies" element={<PolicyPage/>} />
        <Route path="/health-insurance" element={<HealthInsurancePage/>}/>
        <Route path="/vehicle-insurance" element={<VehicleInsurancePage/>}/>
        <Route path="/create-profile" element ={<CreateProfilePage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/> 
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
