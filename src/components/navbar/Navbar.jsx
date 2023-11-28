import { Link } from "react-router-dom";
import logo1 from '../../logo1.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/authContext";

export const NavbarAuthenticated = () => {
  const { onLogout, isAdmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    setShowDropdown(false);
    navigate('/profile-update');
  };

  const handleLogout = async () => {
    await onLogout();
    setShowDropdown(false);
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
};
  
export const NavbarDefault = (() => {
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