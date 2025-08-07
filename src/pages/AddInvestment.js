import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddInvestment() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    stock_symbol: "",
    company_name: "",
    quantity: "",
    buy_price: "",
  });

  const mode = location.state?.mode || "add"; // "add", "edit", or "buyagain"
  const stockData = location.state?.stock;

  useEffect(() => {
    if (mode === "edit" || mode === "buyagain") {
      setForm({
        stock_symbol: stockData.stock_symbol || "",
        company_name: stockData.company_name || "",
        quantity: "",
        buy_price: "",
      });
    }
  }, [mode, stockData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      stock_symbol: form.stock_symbol.toUpperCase(),
      company_name: form.company_name,
      quantity: Number(form.quantity),
      buy_price: Number(form.buy_price),
    };

    if (mode === "edit") {
      axios
        .put(`http://localhost:5000/portfolio/update/${stockData.id}`, payload)
        .then((res) => {
          alert(res.data.message);
          navigate("/dashboard");
        })
        .catch((err) => console.error(err));
    } else if (mode === "buyagain") {
      axios
        .put(`http://localhost:5000/portfolio/buyagain/${stockData.id}`, payload)
        .then((res) => {
          alert(res.data.message);
          navigate("/dashboard");
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:5000/portfolio/add", payload)
        .then((res) => {
          alert(res.data.message);
          navigate("/dashboard");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="container py-4">
      <h3>{mode === "edit" ? "Edit Investment" : mode === "buyagain" ? "Buy Again" : "Add Investment"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Stock Symbol</label>
          <input
            name="stock_symbol"
            className="form-control"
            value={form.stock_symbol}
            onChange={handleChange}
            required
            readOnly={mode !== "add"} // lock for edit/buyagain
          />
        </div>

        <div className="mb-3">
          <label>Company Name</label>
          <input
            name="company_name"
            className="form-control"
            value={form.company_name}
            onChange={handleChange}
            required
            readOnly={mode !== "add"}
          />
        </div>

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

        <div className="mb-3">
          <label>Buy Price</label>
          <input
            name="buy_price"
            type="number"
            step="0.01"
            min="0"
            className="form-control"
            value={form.buy_price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          {mode === "edit" ? "Update Investment" : mode === "buyagain" ? "Buy More" : "Save Investment"}
        </button>
      </form>
    </div>
  );
}
