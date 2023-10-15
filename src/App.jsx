import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/home"
import Login from './pages/login'
import './app.css'
import PolicyPage from './pages/PolicyPage';
import ClaimsPage from "./pages/ClaimsPage";
import HealthInsurancePage from "./pages/HealthInsurancePage";
import VehicleInsurancePage from "./pages/VehicleInsurancePage";


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/claims">Manage Claims</Link>
      <Link to="/policies">Manage Policies</Link>
      <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/claims" element={<ClaimsPage/>}/>
        <Route path="/policies" element={<PolicyPage/>} />
        <Route path="/health-insurance" element={<HealthInsurancePage/>}/>
        <Route path="/vehicle-insurance" element={<VehicleInsurancePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;