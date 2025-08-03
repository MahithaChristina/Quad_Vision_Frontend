import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TopMovers({ onStockClick }) {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  const fetchTopMovers = () => {
    axios
      .get("http://localhost:5000/portfolio/top-movers")
      .then((res) => {
        setGainers(res.data.topGainers || []);
        setLosers(res.data.topLosers || []);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTopMovers(); // fetch first time
    const interval = setInterval(fetchTopMovers, 10000); // refresh every 10 sec
    return () => clearInterval(interval); // cleanup
  }, []);

  const renderList = (list, isGainer) => (
    <ul className="list-group list-group-flush mb-0">
      {list.map((stock) => (
        <li
          key={stock.stock_symbol}
          onClick={() => onStockClick && onStockClick(stock.stock_symbol)}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            isGainer ? "text-success" : "text-danger"
          }`}
          style={{ background: "transparent", cursor: "pointer" }}
        >
          <span className="fw-bold">{stock.stock_symbol}</span>
          <span>{stock.change_percent.toFixed(2)}%</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="mb-3 text-success fw-bold">📈 Top Gainers</h5>
        {gainers.length > 0 ? (
          renderList(gainers, true)
        ) : (
          <p className="text-muted">No data</p>
        )}
        <hr style={{ borderColor: "#333" }} />
        <h5 className="mb-3 text-danger fw-bold">📉 Top Losers</h5>
        {losers.length > 0 ? (
          renderList(losers, false)
        ) : (
          <p className="text-muted">No data</p>
        )}
      </div>
    </div>
  );
}
