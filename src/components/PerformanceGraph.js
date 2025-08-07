
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import dayjs from "dayjs"; // npm install dayjs

// export default function PerformanceGraph() {
//   const [data, setData] = useState([]);
//   const [frequency, setFrequency] = useState("daily");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/portfolio/history?frequency=${frequency}`)
//       .then((res) => {
//         const sortedData = res.data.sort(
//           (a, b) => new Date(a.period) - new Date(b.period)
//         );
//         const formattedData = sortedData.map((item) => ({
//           ...item,
//           date: dayjs(item.period).format("YYYY-MM-DD"),
//           profit_loss: Number(item.profit_loss) || 0,
//         }));
//         setData(formattedData);
//       })
//       .catch((err) => console.error(err));
//   }, [frequency]);

//   return (
//     <div
//       className="card shadow-sm p-4 mb-4"
//       style={{
//         background: "white",
//         borderRadius: "20px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         color: "#333",
//       }}
//     >
//       <h5 className="mb-3" style={{ fontWeight: "600", color: "#333",fw: "bold" }}>
//         📊 Profit/Loss Performance (3 PM Snapshot)
//       </h5>

//       <div className="mb-3">
//         <label className="form-label" style={{ fontWeight: "500" }}>
//           Select Frequency
//         </label>
//         <select
//           className="form-select"
//           value={frequency}
//           onChange={(e) => setFrequency(e.target.value)}
//           style={{
//             borderRadius: "8px",
//             padding: "8px",
//             borderColor: "#ccc",
//           }}
//         >
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//           <XAxis
//             dataKey="date"
//             tick={{ fill: "#666", fontSize: 12 }}
//             stroke="#aaa"
//           />
//           <YAxis
//             domain={["auto", "auto"]}
//             tick={{ fill: "#666", fontSize: 12 }}
//             stroke="#aaa"
//           />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#fff",
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               color: "#333",
//             }}
//             formatter={(value) =>
//               isNaN(Number(value)) ? "0.00" : Number(value).toFixed(2)
//             }
//             labelStyle={{ color: "#000" }}
//           />
//           <Line
//             type="monotone"
//             dataKey="profit_loss"
//             stroke="#FFD700"
//             strokeWidth={3}
//             dot={({ cx, cy, value }) => (
//               <circle
//                 cx={cx}
//                 cy={cy}
//                 r={5}
//                 stroke={value >= 0 ? "#28a745" : "#dc3545"}
//                 strokeWidth={2}
//                 fill="#fff"
//               />
//             )}
//             activeDot={{ r: 7 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs"; // npm install dayjs

export default function PerformanceGraph() {
  const [data, setData] = useState([]);
  const [frequency, setFrequency] = useState("daily");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/portfolio/history?frequency=${frequency}`)
      .then((res) => {
        // Sort data by date in ascending order
        const sortedData = res.data.sort(
          (a, b) => new Date(a.period) - new Date(b.period)
        );

        // Format dates & ensure profit_loss is numeric
        const formattedData = sortedData.map((item) => ({
          ...item,
          date: dayjs(item.period).format("YYYY-MM-DD"),
          profit_loss: Number(item.profit_loss) || 0,
        }));

        setData(formattedData);
      })
      .catch((err) => console.error(err));
  }, [frequency]);

  return (
    <div className="card shadow-sm p-3 mb-4">
    <h5 className="mb-3">Profit/Loss Performance (3 PM Snaps</h5>

      {/* Frequency Selector */}
      <div className="mb-3">
        <label className="form-label">Select Frequency</label>
        <select
          className="form-select"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value) =>
              isNaN(Number(value)) ? "0.00" : Number(value).toFixed(2)
            }
          />
          <Line
            type="monotone"
            dataKey="profit_loss"
            stroke="#FFD700"
            strokeWidth={3}
            dot={({ cx, cy, value }) => (
              <circle
                cx={cx}
                cy={cy}
                r={5}
                stroke={value >= 0 ? "#28a745" : "#dc3545"}
                strokeWidth={2}
                fill="#fff"
              />
            )}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
