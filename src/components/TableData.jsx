import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TableData = ({ datas, ket, kat, userInfo }) => {
  const navigate = useNavigate();
  const [nilaiStatus, setNilaiStatus] = useState({});

  useEffect(() => {
    const fetchAllNilai = async () => {
      const status = {};
      for (const data of datas) {
        try {
          const response = await axios.get(
            `https://inkptatif.xyz/penilaian/penilaian.php?nip=${userInfo.nip}&nim=${data.nim}`
          );
          const dataNilai = response.data.penilaian;
          status[data.nim] = dataNilai.length > 0;
        } catch (error) {
          console.error("Error fetching nilai for NIM:", data.nim, error);
        }
      }
      setNilaiStatus(status);
    };

    fetchAllNilai();
  }, [datas]);

  const handleNavigate = (nim) => {
    navigate(`/detail-${kat}/${nim}`, { state: { ket, kat } });
  };

  return (
    <>
      {datas.map((data) => (
        <tr
          key={data.id}
          className="border-b border-r border-dashed last:border-b-0"
        >
          <td className="p-3 pr-0 font-bold text-start text-primary">
            <p>{data.judul}</p>
          </td>
          <td className="flex flex-col items-start justify-center p-3 pr-0">
            <span className="text-base font-bold text-primary">
              {data.nama}
            </span>
            <span className="text-sm font-semibold text-secondary">
              {data.nim}
            </span>
          </td>
          <td className="pr-0 font-bold text-center text-primary">
            <p className="capitalize">{ket}</p>
          </td>
          <td className="pr-0 text-center">
            <span className="font-semibold text-slate-400 text-md/normal">
              {data.tanggal}
            </span>
          </td>
          <td className="pr-0 text-center">
            <span
              className={`inline-block px-[20px] py-2.5 text-sm font-bold ${
                nilaiStatus[data.nim]
                  ? "bg-customGreen text-white"
                  : "bg-customRed text-white"
              }`}
            >
              {nilaiStatus[data.nim] ? "Sudah" : "Belum"}
            </span>
          </td>
          <td className="p-3 pr-0 font-bold text-primary">
            <button
              onClick={() => handleNavigate(data.nim)}
              className="inline-block px-[20px] py-2 border-2 border-primary text-primary text-sm font-bold hover:bg-primary hover:text-customWhite"
            >
              Lihat
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableData;
