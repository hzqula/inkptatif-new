import React from "react";
import { useNavigate } from "react-router-dom";

const CardMahasiswa = ({ data, ket, kat }) => {
  const navigate = useNavigate();

  const handleNavigate = (nim) => {
    navigate(`/detail-${kat}/${nim}`, { state: { ket, kat } });
  };

  return (
    <div className="p-4 mb-4 bg-white border shadow-md border-gray shadow-black/7">
      <h3 className="mb-2 text-lg font-bold text-primary">{data.judul}</h3>
      <h3 className="mb-1 font-bold text-secondary">{data.nama}</h3>
      <h3 className="mb-1 font-bold text-secondary">{data.nim}</h3>
      <h3 className="mb-1 font-bold capitalize text-secondary">{ket}</h3>
      <h3 className="mb-1 font-bold text-secondary">{data.tanggal}</h3>
      <div className="flex justify-end w-full gap-2">
        <span className="inline-block px-[20px] py-2.5 bg-primary text-customWhite text-sm font-bold">
          Sudah
        </span>
        <button
          onClick={() => handleNavigate(data.nim)}
          className="inline-block px-[20px] py-2 border-2 border-primary text-primary text-sm font-bold hover:bg-primary hover:text-customWhite"
        >
          Lihat
        </button>
      </div>
    </div>
  );
};

export default CardMahasiswa;
