import React from "react";
import InputNilai from "./InputNilai";

const CardNilai = ({ dataSeminar, userInfo, ket, kat }) => {
  if (!dataSeminar || !userInfo) {
    return null;
  }

  return (
    <>
      <h1 className="mb-4 text-xl font-black text-center text-primary">
        Penilaian
      </h1>
      <div className="flex flex-col items-center mb-6 overflow-y-auto h-[24rem]">
        <InputNilai
          dataSeminar={dataSeminar}
          userInfo={userInfo}
          ket={ket}
          kat={kat}
        />
      </div>
    </>
  );
};

export default CardNilai;
