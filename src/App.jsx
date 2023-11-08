import { HashRouter as BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
//iiimport AuthPage from "./pages/AuthPage";
import './app.css'
import PolicyPage from './pages/PolicyPage';
import ClaimsPage from "./pages/ClaimsPage";
import HealthInsurancePage from "./pages/HealthInsurancePage";
import VehicleInsurancePage from "./pages/VehicleInsurancePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/claims">Manage Claims</Link>
      <Link to="/policies">Manage Policies</Link>
      <Link to="/login">Login / Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/claims" element={<ClaimsPage/>}/>
        <Route path="/policies" element={<PolicyPage/>} />
        <Route path="/health-insurance" element={<HealthInsurancePage/>}/>
        <Route path="/vehicle-insurance" element={<VehicleInsurancePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
