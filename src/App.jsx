import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/home"
import Login from './pages/login'


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Supa Smoothies</h1>
        <Link to="/">Home</Link>
        <Link to="/Login">Login/Signup</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;