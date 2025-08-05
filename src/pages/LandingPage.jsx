
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css"; // Optional: style it separately

export default function LandingPage() {
  const navigate = useNavigate();

//   const handleStart = () => {
//     navigate("/dashboard");
//   };
const handleClick = () => {
    navigate("/dashboard");
  };

//   return (
//     <div className="landing-container d-flex flex-column justify-content-center align-items-center text-center vh-100">
//       <h1 className="mb-4">Welcome to Your Portfolio Tracker 📈</h1>
//       <p className="mb-4">Track your investments, monitor performance, and stay updated!</p>
//       <button className="btn btn-primary btn-lg" onClick={handleStart}>
//         🚀 Get Started
//       </button>
//     </div>
//   );

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
