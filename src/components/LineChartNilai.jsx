import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const LineChartNilai = ({ dataDosen, dataSeminar }) => {
  if (!dataDosen || !dataSeminar) {
    return null;
  }

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/penilaian/penilaian.php?nip=${dataDosen.nip}&nim=${dataSeminar.nim}`
        );

        // Pengecekan apakah response.data memiliki data penilaian
        if (response.data && response.data.penilaian) {
          setChartData(response.data);
        } else {
          // Jika tidak ada data penilaian, atur chartData dengan nilai default
          setChartData({
            penilaian: [
              { kriteria: "Kriteria 1", nilai: 0 },
              { kriteria: "Kriteria 2", nilai: 0 },
              { kriteria: "Kriteria 3", nilai: 0 },
              // Tambahkan kriteria lainnya jika diperlukan
            ],
          });
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
        // Handle error fetching data
        // Atur chartData dengan nilai default jika terjadi error
        setChartData({
          penilaian: [
            { kriteria: "Kriteria 1", nilai: 0 },
            { kriteria: "Kriteria 2", nilai: 0 },
            { kriteria: "Kriteria 3", nilai: 0 },
            // Tambahkan kriteria lainnya jika diperlukan
          ],
        });
      }
    };

    fetchData();
  }, [dataDosen, dataSeminar]);

  // Komponen kustom untuk Tooltip
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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData.penilaian}>
        <Tooltip
          content={<CustomTooltip />}
          labelStyle={{ display: "none" }}
          position={{ y: 70, x: -10 }}
        />
        <Line
          type="monotone"
          dataKey="nilai"
          stroke="#219ebc"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartNilai;
