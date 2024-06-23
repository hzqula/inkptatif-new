import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartNilai = ({ userInfo, data }) => {
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

  const COLORS = ["#04395e", "#04395e", "#70a288", "#d5896f"];

  // Hitung rata-rata nilai
  const totalNilai = chartData.reduce((acc, cur) => acc + cur.nilai, 0);
  const averageNilai = (totalNilai / chartData.length).toFixed(2);

  // Custom Label
  const renderCustomizedLabel = ({ cx, cy }) => {
    const textWidth = 60; // Adjust the width based on your text length
    const textHeight = 40; // Adjust the height based on your text size

    return (
      <g>
        <rect
          x={cx - textWidth / 2}
          y={cy + 3 - textHeight / 2}
          width={textWidth}
          height={textHeight}
          fill="#219ebc"
          rx={10}
        />
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={16}
          fontWeight="bold"
        >
          {`${averageNilai}`}
        </text>
      </g>
    );
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="mb-1 text-base font-bold text-center text-primary">
        Distribusi Nilai
      </h1>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={60}
            fill="#8884d8"
            dataKey="nilai"
            nameKey="kriteria"
            label={renderCustomizedLabel}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartNilai;
