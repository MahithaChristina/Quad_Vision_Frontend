// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StockTicker from "../components/Stockticker";
// import PerformanceGraph from "../components/PerformanceGraph";
// import TransactionsTable from "../components/Transactiontable";
// import PortfolioAllocationChart from "../components/PieChart";
// import TopMovers from "../components/TopMovers";
// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/portfolio")
//       .then((res) => setData(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const scrollToStock = (symbol) => {
//     const row = document.getElementById(`stock-${symbol}`);
//     if (row) {
//       row.scrollIntoView({ behavior: "smooth", block: "center" });

//       // Add animations
//       row.classList.add("highlight-row", "shake");

//       // Remove so it can be retriggered
//       setTimeout(() => {
//         row.classList.remove("highlight-row", "shake");
//       }, 3000);
//     }
//   };

//   if (!data) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="container-fluid p-0">
//       <StockTicker />

//       <div className="container py-4">
//         <h1 className="mb-4 fade-in">Financial Portfolio</h1>

//         {/* Stats Cards */}
//         <div className="row mb-4 fade-in">
//           <div className="col-md-6">
//             <div className="card shadow-sm text-center">
//               <div className="card-body">
//                 <h6 className="text-muted">Total Value</h6>
//                 <h4 className="text-accent">
//                   {Number(data.total_portfolio_value).toFixed(2)}
//                 </h4>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="card shadow-sm text-center">
//               <div className="card-body">
//                 <h6 className="text-muted">Realized P/L</h6>
//                 <h4
//                   className={
//                     Number(data.realized_pl) >= 0
//                       ? "text-success"
//                       : "text-danger"
//                   }
//                 >
//                   {Number(data.realized_pl).toFixed(2)}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Graph + Top Movers */}
//         <div className="row mb-4">
//           <div className="col-md-8 chart-container">
//             <PerformanceGraph />
//           </div>
//           <div className="col-md-4 fade-in">
//             <TopMovers onStockClick={scrollToStock} />
//           </div>
//         </div>

//         {/* Portfolio + Pie Chart */}
//         <div className="row mb-4 fade-in">
//           <div className="col-md-8">
//             <div className="card shadow-sm h-100">
//               <div className="card-body">
//                 <h5 className="mb-3">Portfolio</h5>
//                 <table className="table table-striped table-hover">
//                   <thead className="table-light">
//                     <tr>
//                       <th>Stock</th>
//                       <th>Current Price</th>
//                       <th>Avg Buy Price</th>
//                       <th>Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.portfolio.map((stock) => (
//                       <tr key={stock.id} id={`stock-${stock.stock_symbol}`}>
//                         <td>{stock.stock_symbol}</td>
//                         <td>{stock.current_price}</td>
//                         <td>{stock.avg_buy_price}</td>
//                         <td>{stock.quantity}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <PortfolioAllocationChart
//               portfolio={data.portfolio}
//               totalValue={data.total_portfolio_value}
//             />
//           </div>
//         </div>

//         {/* Transactions */}
//         <div className="fade-in">
//           <TransactionsTable />
//         </div>

//         {/* Add Investment */}
//         <div className="mt-3 fade-in">
//           <a href="/add-investment" className="btn btn-primary">
//             ➕ Add Investment
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import StockTicker from "../components/Stockticker";
import PerformanceGraph from "../components/PerformanceGraph";
import TransactionsTable from "../components/Transactiontable";
import PortfolioAllocationChart from "../components/PieChart";
import TopMovers from "../components/TopMovers";
import AccountBalance from "../components/AccountBalance"; // ✅ New component
import "../styles/dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/portfolio")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

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
          {/* Account Balance */}
          <div className="col-md-4">
            <AccountBalance amount={data.account_balance} />
          </div>

          {/* Total Portfolio Value */}
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Portfolio Value</h6>
                <h4 className="text-accent">
                  ${Number(data.total_portfolio_value).toFixed(2)}
                </h4>
              </div>
            </div>
          </div>

          {/* Realized P/L */}
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-muted">Realized P/L</h6>
                <h4
                  className={
                    Number(data.realized_pl) >= 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  ${Number(data.realized_pl).toFixed(2)}
                </h4>
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

        {/* Portfolio + Allocation */}
        <div className="row mb-4 fade-in">
          <div className="col-md-8">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="mb-3">Portfolio</h5>
                <table className="table table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Stock</th>
                      <th>Current Price</th>
                      <th>Avg Buy Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.portfolio.map((stock) => (
                      <tr key={stock.id} id={`stock-${stock.stock_symbol}`}>
                        <td>{stock.stock_symbol}</td>
                        <td>${stock.current_price}</td>
                        <td>${stock.avg_buy_price}</td>
                        <td>{stock.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <PortfolioAllocationChart
              portfolio={data.portfolio}
              totalValue={data.total_portfolio_value}
            />
          </div>
        </div>

        {/* Transactions */}
        <div className="fade-in">
          <TransactionsTable />
        </div>

        {/* Add Investment */}
        <div className="mt-3 fade-in">
          <a href="/add-investment" className="btn btn-primary">
            ➕ Add Investment
          </a>
        </div>
      </div>
    </div>
  );
}
