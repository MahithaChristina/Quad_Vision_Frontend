/*import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AccountBalance() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/portfolio/balance")
      .then((res) => setBalance(res.data.balance))
      .catch((err) => {
        console.error("Error fetching balance:", err);
        setBalance("Error");
      });
  }, []);

  if (balance === null) {
    return (
      <div className="card-body p-3">
        <div className="card-body">
          <h6 className="text-muted">💵Account Balance</h6>
          <h4>Loading...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="card-body p-3">
      <div className="card-body">
        <h6 className=" text-white fw-bold fs-4">💵Account Balance</h6>
        <h4 className="text-primary text-white fw-bold fs-4">${Number(balance).toFixed(2)}</h4>
      </div>
    </div>
  );
}*/





import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AccountBalance.css"; // Import the custom CSS

export default function AccountBalance() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/portfolio/balance")
      .then((res) => setBalance(res.data.balance))
      .catch((err) => {
        console.error("Error fetching balance:", err);
        setBalance("Error");
      });
  }, []);

  return (
    <div className="card-container">
      <div className="card-flip">
        <div className="card-front">
          <div className="card-chip" />
          <div className="card-text">
            <div className="card-title">💳 Account Balance</div>
            <div className="card-number">**** **** **** 1234</div>
            <div className="card-expiry">Exp: 12/24</div>
          </div>
          <div className="card-logo">💰</div>
        </div>

        <div className="card-back">
          <div className="balance-text">Balance</div>
          <div className="balance-amount">
            {balance === null ? "Loading..." : `$${Number(balance).toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
}

