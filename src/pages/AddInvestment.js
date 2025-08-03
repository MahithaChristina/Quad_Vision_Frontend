import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddInvestment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    stock_symbol: "",
    quantity: "",
    transaction_type: "BUY",
  });
  const [marketPrice, setMarketPrice] = useState(null);

  // Fetch current market price when symbol changes
  useEffect(() => {
    if (form.stock_symbol.trim() !== "") {
      axios
        .get(`http://localhost:5000/portfolio/ticker`)
        .then((res) => {
          // Find price from ticker list
          const stockData = res.data.find(
            (s) => s.symbol.toUpperCase() === form.stock_symbol.toUpperCase()
          );
          if (stockData) {
            setMarketPrice(stockData.price);
          } else {
            setMarketPrice(null);
          }
        })
        .catch((err) => {
          console.error(err);
          setMarketPrice(null);
        });
    }
  }, [form.stock_symbol]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/portfolio/add", {
        stock_symbol: form.stock_symbol.toUpperCase(),
        quantity: Number(form.quantity),
        transaction_type: form.transaction_type,
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container py-4">
      <h3>Add Investment</h3>
      <form onSubmit={handleSubmit}>
        {/* Stock Symbol */}
        <div className="mb-3">
          <label>Stock Symbol</label>
          <input
            name="stock_symbol"
            className="form-control"
            placeholder="AAPL"
            value={form.stock_symbol}
            onChange={handleChange}
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-3">
          <label>Quantity</label>
          <input
            name="quantity"
            type="number"
            min="1"
            className="form-control"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Transaction Type */}
        <div className="mb-3">
          <label>Transaction Type</label>
          <select
            name="transaction_type"
            className="form-select"
            value={form.transaction_type}
            onChange={handleChange}
          >
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
        </div>

        {/* Market Price Display */}
        {marketPrice !== null && (
          <div className="mb-3">
            <label>Market Price</label>
            <input
              className="form-control"
              value={`$${marketPrice}`}
              readOnly
            />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          Save Transaction
        </button>
      </form>
    </div>
  );
}
