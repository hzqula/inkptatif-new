import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AreaChartNilai = ({ userInfo, data }) => {
  if (!userInfo || !data) {
    return null;
  }

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/penilaian/penilaian.php?nip=${userInfo.nip}&nim=${data.nim}`
        );

        if (response.data && response.data.penilaian) {
          setChartData(response.data.penilaian);
        } else {
          setChartData([
            { kriteria: "Kriteria 1", nilai: 0 },
            { kriteria: "Kriteria 2", nilai: 0 },
            { kriteria: "Kriteria 3", nilai: 0 },
          ]);
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
        setChartData([
          { kriteria: "Kriteria 1", nilai: 0 },
          { kriteria: "Kriteria 2", nilai: 0 },
          { kriteria: "Kriteria 3", nilai: 0 },
        ]);
      }
    };

    fetchData();
  }, [userInfo, data]);

  console.log(chartData);

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            padding: "12px",
            width: "150px",
            background: "white",
            border: "2px solid #033D5B",
            borderRadius: "4px",
            fontSize: "12px",
            color: "rgb(33 158 188)",
          }}
        >
          <p className="font-extrabold text-primary">
            Kriteria:
            <span className="font-medium text-secondary"> {data.kriteria}</span>
          </p>
          <p className="font-extrabold text-primary">
            Nilai:
            <span className="font-medium text-secondary"> {data.nilai}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="mb-2 text-xl font-black text-primary">Detail Nilai</h1>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 35, right: 30, left: 0, bottom: 70 }} // Menambahkan margin bawah
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="kriteria"
              fontSize={12}
              tick={{ fontSize: 10 }}
              interval={0}
              dy={10}
              dx={-10} // Menambahkan penyesuaian horizontal
              tickFormatter={(tick) => truncateText(tick, 2)}
              angle={-45} // Menambahkan rotasi pada label XAxis
              textAnchor="end"
            />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              content={<CustomTooltip />}
              labelStyle={{ display: "show" }}
              position={{ y: -40 }}
            />
            <Area
              type="monotone"
              dataKey="nilai"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="nilai"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartNilai;
