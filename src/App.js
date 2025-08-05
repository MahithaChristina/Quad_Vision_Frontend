import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
//import "../styles/landing.css"; // Ensure styles are imported
import AddInvestment from "./pages/AddInvestment";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-investment" element={<AddInvestment />} />
      </Routes>
    </Router>
  );
}
