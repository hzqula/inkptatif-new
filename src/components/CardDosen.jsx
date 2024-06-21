import React from "react";
import Button from "./Button";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const test = [
  {
    product: "shoe",
    quantity: 4,
  },
  {
    product: "shoe",
    quantity: 1,
  },
  {
    product: "shoe",
    quantity: 3,
  },
  {
    product: "shoe",
    quantity: 1,
  },
  {
    product: "shoe",
    quantity: 2,
  },
];

const CardDosen = ({
  ket = "Keterangan",
  nama = "Fulan",
  nip = "31245658542",
}) => {
  return (
    <>
      <h1 className="mb-2 text-xl font-black text-primary">{ket}</h1>
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-bold text-primary">{nama}</h2>
          <h2 className="text-sm font-medium text-secondary">{nip}</h2>
        </div>
        <div className="w-10 h-10 overflow-hidden">
          <img
            src="noavatar.png"
            alt="profil"
            className="border rounded-full border-secondary"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="w-2/5">
          <Button teks="Sudah" />
        </div>
        <div className="w-2/5 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={test}>
              <Tooltip
                contentStyle={{
                  background: "transparent",
                  border: "none",
                  fontSize: "12px",
                }}
                labelStyle={{ display: "none" }}
                position={{ y: 60 }}
              />
              <Line
                type="monotone"
                dataKey="quantity"
                stroke="#219ebc"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default CardDosen;
