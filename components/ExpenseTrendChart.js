"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const tooltipStyles = {
  backgroundColor: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "0.75rem",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  padding: "0.5rem 0.75rem"
};

export default function ExpenseTrendChart({ data }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#93c5fd" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "4 4" }}
            contentStyle={tooltipStyles}
            formatter={(value) => [`$${value}`, "Spending"]}
          />
          <Area
            type="monotone"
            dataKey="spending"
            stroke="#1d4ed8"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorSpending)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
