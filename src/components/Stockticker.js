import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Stockticker.css";

export default function StockTicker() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchTicker();
    const interval = setInterval(fetchTicker, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchTicker = () => {
    axios
      .get("http://localhost:5000/portfolio/ticker")
      .then((res) => setStocks(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="ticker-bar bg-dark text-white py-2">
      <marquee behavior="scroll" direction="left" scrollamount="5">
        {stocks.map((s, i) => (
          <span key={i} className="mx-4">
            <strong>{s.symbol}</strong> ${s.price.toFixed(2)}
            <span
              className={
                s.change >= 0 ? "text-success ms-1" : "text-danger ms-1"
              }
            >
              {s.change >= 0 ? `+${s.change}` : s.change} ({s.change_percent})
            </span>
          </span>
        ))}
      </marquee>
    </div>
  );
}
