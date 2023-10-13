import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/home"
import Login from './pages/login'
import './app.css'


function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
      <h1>Insurance Management</h1>
        <div className="nav_container">
        <Link to="/">Home</Link>
        <Link to="/Login">Login/Signup</Link>
        <Link to="Claim">Claim</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;