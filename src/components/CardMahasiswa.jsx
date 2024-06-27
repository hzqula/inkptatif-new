import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardMahasiswa = ({ data, ket, kat, userInfo }) => {
  const navigate = useNavigate();
  const [isNilaiFilled, setIsNilaiFilled] = useState(false);

  useEffect(() => {
    const fetchExistingNilai = async () => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/penilaian/penilaian.php?nip=${userInfo.nip}&nim=${data.nim}`
        );
        const dataNilai = response.data.penilaian;

        setIsNilaiFilled(dataNilai.length > 0);
      } catch (error) {
        console.error("Error fetching existing nilai:", error);
      }
    };

    fetchExistingNilai();
  }, [data.nim]);

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
        <span
          className={`inline-block px-[20px] py-2.5 text-sm font-bold ${
            isNilaiFilled
              ? "bg-customGreen text-white"
              : "bg-customRed text-white"
          }`}
        >
          {isNilaiFilled ? "Sudah" : "Belum"}
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
