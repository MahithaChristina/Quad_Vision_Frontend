import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StockTicker from "../components/Stockticker";
import PerformanceGraph from "../components/PerformanceGraph";
import TransactionsTable from "../components/Transactiontable";
import PortfolioAllocationChart from "../components/PieChart";
import TopMovers from "../components/TopMovers";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const navigate = useNavigate();

  const fetchPortfolio = () => {
    axios
      .get("http://localhost:5000/portfolio")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        const invested = res.data.portfolio.reduce((sum, stock) => {
          return sum + Number(stock.buy_price) * Number(stock.quantity);
        }, 0);
        setTotalInvestment(invested.toFixed(2));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPortfolio();
    axios
      .get("http://localhost:5000/portfolio/balance")
      .then((res) => {
        setAccountBalance(Number(res.data.balance).toFixed(2));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/portfolio/${id}`)
      .then(() => fetchPortfolio())
      .catch((err) => console.error(err));
  };

  const scrollToStock = (symbol) => {
    const row = document.getElementById(`stock-${symbol}`);
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      row.classList.add("highlight-row", "shake");
      setTimeout(() => {
        row.classList.remove("highlight-row", "shake");
      }, 3000);
    }
  };

  if (!data) return <p className="p-4">Loading...</p>;

  return (
    <div className="container-fluid p-0">
      <StockTicker />

      <div className="container py-4">
        <h1 className="mb-4 fade-in">Financial Portfolio</h1>

        {/* Stats Cards */}
        <div className="row mb-4 fade-in">
          <div className="col-md-3">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-muted">Market Value</h6>
                <h4 className="text-accent">
                  ${Number(data.total_portfolio_value).toFixed(2)}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-muted">Profit/Loss</h6>
                <h4
                  className={
                    (() => {
                      const pl = data.portfolio.reduce((sum, stock) => {
                        return (
                          sum +
                          (Number(stock.current_price) - Number(stock.buy_price)) *
                            Number(stock.quantity)
                        );
                      }, 0);
                      return pl >= 0 ? "text-success" : "text-danger";
                    })()
                  }
                >
                  $
                  {data.portfolio
                    .reduce((sum, stock) => {
                      return (
                        sum +
                        (Number(stock.current_price) - Number(stock.buy_price)) *
                          Number(stock.quantity)
                      );
                    }, 0)
                    .toFixed(2)}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Invested</h6>
                <h4>${totalInvestment}</h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-muted">Account Balance</h6>
                <h4>${accountBalance}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Graph + Top Movers */}
        <div className="row mb-4">
          <div className="col-md-8 chart-container">
            <PerformanceGraph />
          </div>
          <div className="col-md-4 fade-in">
            <TopMovers onStockClick={scrollToStock} />
          </div>
        </div>

        {/* Portfolio Table + Allocation Chart */}
        <div className="row mb-4 fade-in">
          <div className="col-md-8">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="mb-3">Portfolio</h5>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Symbol</th>
                        <th>Company</th>
                        <th>Quantity</th>
                        <th>Buy Price</th>
                        <th>Current Price</th>
                        <th>Total Value</th>
                        <th>P&L</th>
                        <th>P&L %</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.portfolio.map((stock) => {
                        const totalValue = Number(stock.current_price) * stock.quantity;
                        const pnl =
                          (Number(stock.current_price) - Number(stock.buy_price)) *
                          stock.quantity;
                        const pnlPercent =
                          ((Number(stock.current_price) - Number(stock.buy_price)) /
                            Number(stock.buy_price)) *
                          100;

                        return (
                          <tr key={stock.id} id={`stock-${stock.stock_symbol}`}>
                            <td>{stock.stock_symbol}</td>
                            <td>{stock.company_name}</td>
                            <td>{stock.quantity}</td>
                            <td>${Number(stock.buy_price).toFixed(2)}</td>
                            <td>${Number(stock.current_price).toFixed(2)}</td>
                            <td>${totalValue.toFixed(2)}</td>
                            <td className={pnl >= 0 ? "text-success" : "text-danger"}>
                              ${pnl.toFixed(2)}
                            </td>
                            <td className={pnl >= 0 ? "text-success" : "text-danger"}>
                              {pnlPercent.toFixed(2)}%
                            </td>
                            <td className="d-flex flex-column gap-1">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => navigate("/add-investment", {
                                  state: { mode: "edit", stock }
                                })}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-info"
                                onClick={() => navigate("/add-investment", {
                                  state: { mode: "buyagain", stock }
                                })}
                              >
                                Buy More
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(stock.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col-md-4">
            <PortfolioAllocationChart
              portfolio={data.portfolio}
              totalValue={data.total_portfolio_value}
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="fade-in">
          <TransactionsTable />
        </div>

        {/* Add Investment Button */}
        <div className="mt-3 fade-in">
          <a href="/add-investment" className="btn btn-primary">
            ➕ Add Investment
          </a>
        </div>
      </div>
    </div>
  );
}