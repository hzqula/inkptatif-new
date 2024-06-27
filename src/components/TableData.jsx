import React from "react";
import { useNavigate } from "react-router-dom";

const TableData = ({ datas, ket, kat }) => {
  const navigate = useNavigate();

  const handleNavigate = (nim) => {
    navigate(`/detail-${kat}/${nim}`, { state: { ket, kat } });
  };

  console.log(kat);

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
            <span className="inline-block px-[20px] py-2.5 bg-primary text-customWhite text-sm font-bold">
              Sudah
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
