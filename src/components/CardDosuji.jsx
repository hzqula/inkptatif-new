import React from "react";
import Button from "./Button";
import LineChartNilai from "./LineChartNilai";
import profile from "../assets/noavatar.png";

const CardDosuji = ({ dataDosen, dataSeminar, ket }) => {
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
          <Button teks="Sudah" />
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
