import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChartNilai from "./LineChartNilai";
import profile from "../assets/noavatar.png";

const CardDosuji = ({ dataDosen, dataSeminar, ket }) => {
  const [isNilaiFilled, setIsNilaiFilled] = useState(false);

  useEffect(() => {
    const fetchExistingNilai = async () => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/penilaian/penilaian.php?nip=${dataDosen.nip}&nim=${dataSeminar.nim}`
        );
        const data = response.data.penilaian;

        setIsNilaiFilled(data.length > 0);
      } catch (error) {
        console.error("Error fetching existing nilai:", error);
      }
    };

    fetchExistingNilai();
  }, [dataDosen.nip, dataSeminar.nim]);

  if (!dataDosen && !dataSeminar) {
    return null;
  }

  return (
    <div>
      <h1 className="mb-2 text-xl font-black text-primary">{ket}</h1>
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-bold text-primary">{dataDosen.nama}</h2>
          <h2 className="text-sm font-medium text-secondary">
            {dataDosen.nip}
          </h2>
        </div>
        <div className="w-10 h-10 overflow-hidden">
          <img
            src={profile}
            alt="profil"
            className="border rounded-full border-secondary"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="w-2/5">
          <span
            className={`inline-block px-[20px] py-2.5 text-sm font-bold ${
              isNilaiFilled
                ? "bg-customGreen text-white"
                : "bg-customRed text-white"
            }`}
          >
            {isNilaiFilled ? "Sudah" : "Belum"}
          </span>
        </div>
        <div className="w-2/5 h-16">
          <LineChartNilai
            dataDosen={dataDosen}
            dataSeminar={dataSeminar}
            ket={ket}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDosuji;
