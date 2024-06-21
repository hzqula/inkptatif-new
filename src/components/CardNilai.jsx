import React from "react";
import Button from "./Button";
import InputNumber from "./InputNumber";

const CardNilai = () => {
  return (
    <>
      <h1 className="mb-4 text-xl font-black text-center text-primary">
        Penilaian
      </h1>
      <div className="flex flex-col items-center mb-6 overflow-y-auto h-[20rem]">
        <InputNumber />
        <InputNumber />
        <InputNumber />
        <InputNumber />
        <InputNumber />
      </div>
      <div className="absolute bottom-0 flex justify-center w-full px-4 py-4 translate-x-1/2 bg-white right-1/2">
        <Button teks="Simpan" />
      </div>
    </>
  );
};

export default CardNilai;
