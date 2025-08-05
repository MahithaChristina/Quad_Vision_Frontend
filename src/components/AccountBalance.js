import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AccountBalance() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/balance")
      .then((res) => setBalance(res.data.balance))
      .catch((err) => {
        console.error("Error fetching balance:", err);
        setBalance("Error");
      });
  }, []);

  if (balance === null) {
    return (
      <div className="card shadow-sm text-center mb-4 fade-in">
        <div className="card-body">
          <h6 className="text-muted">Account Balance</h6>
          <h4>Loading...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm text-center mb-4 fade-in">
      <div className="card-body">
        <h6 className="text-muted">Account Balance</h6>
        <h4 className="text-primary">${Number(balance).toFixed(2)}</h4>
      </div>
    </div>
  );
}
