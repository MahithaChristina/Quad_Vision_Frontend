
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AccountBalance.css"; // Import the custom CSS

// export default function AccountBalance() {
//   const [balance, setBalance] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/portfolio/balance")
//       .then((res) => setBalance(res.data.balance))
//       .catch((err) => {
//         console.error("Error fetching balance:", err);
//         setBalance("Error");
//       });
//   }, []);

//   return (
//     <div className="card-container">
//       <div className="card-flip">
//         <div className="card-front">
//           <div className="card-chip" />
//           <div className="card-text">
//             <div className="card-title">💳 Account Balance</div>
//             <div className="card-number">**** **** **** 1234</div>
//             <div className="card-expiry">Exp: 12/24</div>
//           </div>
//           <div className="card-logo">💰</div>
//         </div>

//         <div className="card-back">
//           <div className="balance-text">Balance</div>
//           <div className="balance-amount">
//             {balance === null ? "Loading..." : `$${Number(balance).toFixed(2)}`}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/portfolio/balance')
      .then(res => {
        const numericBalance = parseFloat(res.data.balance);
        setBalance(numericBalance);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching account balance:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '16px',
      backgroundColor: '#f9f9f9',
      width: 'fit-content',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ margin: 0, fontSize: '18px' }}>Account Balance</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
          ₹ {balance.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default AccountBalance;

