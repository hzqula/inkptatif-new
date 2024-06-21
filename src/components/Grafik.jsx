"use client";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const test = [
  {
    product: "shoe",
    quantity: 4,
  },
  {
    product: "shoe",
    quantity: 2,
  },
  {
    product: "shoe",
    quantity: 3,
  },
];

const Grafik = () => {
  return (
    <>
      <div>
        <h1 className="mb-2 text-xl font-black text-primary">Penilaian</h1>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={test}>
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="30 30" />
            <Area
              type="monotone"
              dataKey="quantity"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Grafik;
