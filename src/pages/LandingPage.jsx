
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css"; // Optional: style it separately

export default function LandingPage() {
  const navigate = useNavigate();


const handleClick = () => {
    navigate("/dashboard");
  };



return (
    <div className="landing-container d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <div className>
      <h2 className="app-name">🚀 Quad Vision</h2>
        <h1 className="typewriter-text mb-4">Hi,Customer!..</h1>
        <p className="subtitle">Welcome to your financial dashboard</p>
        <button className="btn btn-primary btn-lg" onClick={handleClick}>
          🚀 Get Started
        </button>
      </div>
    </div>
  );
}
