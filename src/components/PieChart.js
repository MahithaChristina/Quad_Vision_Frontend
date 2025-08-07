

// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export default function PortfolioAllocationChart({ portfolio }) {
//   const COLORS = ["#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236", "#166a8f", "#00a950"];

//   // Prepare data
//   const totalValue = portfolio.reduce(
//     (acc, stock) => acc + stock.quantity * stock.current_price,
//     0
//   );

//   const data = portfolio.map((stock) => ({
//     name: stock.stock_symbol,
//     value: stock.quantity * stock.current_price,
//   }));

//   return (
//     <div className="card shadow-sm mb-4">
//       <div className="card-body">
//         <h5 className="mb-3 text-dark fw-bold">
//           📊 Portfolio Allocation
//         </h5>

//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, value }) =>
//                 `${name}: ₹${value.toFixed(0)} (${((value / totalValue) * 100).toFixed(1)}%)`
//               }
//               outerRadius={110}
//               innerRadius={40}
//               fill="#8884d8"
//               dataKey="value"
//               paddingAngle={4}
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                   stroke="#ffffff"
//                   strokeWidth={2}
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               formatter={(value) => [`₹${value.toFixed(2)}`, "Value"]}
//               contentStyle={{ backgroundColor: "#f0f0f0", borderRadius: "8px" }}
//             />
//             <Legend layout="horizontal" verticalAlign="bottom" iconType="circle" />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PortfolioAllocationChart({ portfolio }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  // Prepare data
  const totalValue = portfolio.reduce(
    (acc, stock) => acc + stock.quantity * stock.current_price,
    0
  );

  const data = portfolio.map((stock) => ({
    name: stock.stock_symbol,
    value: stock.quantity * stock.current_price,
  }));

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">Portfolio Allocation</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) =>
                `${name} ${((value / totalValue) * 100).toFixed(1)}%`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toFixed(2)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

