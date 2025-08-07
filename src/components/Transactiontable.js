/*import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/portfolio/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">Transaction History</h5>
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Stock</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price per Share</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className={
                  tx.transaction_type === "BUY"
                    ? "table-success"
                    : "table-danger"
                }
              >
                <td>{new Date(tx.transaction_date).toLocaleString()}</td>
                <td>{tx.stock_symbol}</td>
                <td
                  className={
                    tx.transaction_type === "BUY"
                      ? "text-success fw-bold"
                      : "text-danger fw-bold"
                  }
                >
                  {tx.transaction_type}
                </td>
                <td>{tx.quantity}</td>
                <td>{Number(tx.price_per_share).toFixed(2)}</td>
                <td>{(tx.quantity * tx.price_per_share).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}*/



import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/portfolio/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-body">
        <h5 className="mb-3 fw-bold text-dark">📄 Transaction History</h5>

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-dark text-white">
              <tr>
                <th scope="col">📅 Date</th>
                <th scope="col">🏦 Stock</th>
                <th scope="col">🔄 Type</th>
                <th scope="col">🔢 Quantity</th>
                <th scope="col">💰 Price/Share</th>
                <th scope="col">💸 Total</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{new Date(tx.transaction_date).toLocaleString()}</td>
                  <td className="fw-bold">{tx.stock_symbol}</td>
                  <td
                    className={
                      "fw-semibold " +
                      (tx.transaction_type === "BUY"
                        ? "text-primary"
                        : "text-warning")
                    }
                  >
                    {tx.transaction_type}
                  </td>
                  <td>{tx.quantity}</td>
                  <td>₹{Number(tx.price_per_share).toFixed(2)}</td>
                  <td>
                    ₹{(tx.quantity * tx.price_per_share).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



