import React from "react";
import profile from "../assets/noavatar.png";
import PieChartNilai from "./PieChartNilai";

const CardSeminar = ({ data, userInfo }) => {
  console.log(data);
  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div>
        <h1 className="mb-2 text-xl font-black text-primary">Seminar KP</h1>
        <div className="flex items-start justify-between mb-2">
          <div className="w-4/5">
            <h2 className="text-base font-bold text-primary">
              {data ? data.nama : "Loading..."}
            </h2>
            <h2 className="text-sm font-medium text-secondary">
              {data ? data.nim : "Loading..."}
            </h2>
          </div>
          <div className="w-10 h-10 overflow-hidden ">
            <img
              src={profile}
              alt="profil"
              className="border rounded-full border-secondary"
            />
          </div>
        </div>
        <div className="mb-2">
          <h2 className="text-base font-bold text-primary">Judul:</h2>
          <h3 className="text-sm font-medium text-secondary">
            {data ? data.judul : "Loading..."}
          </h3>
        </div>
        <div className="mb-2">
          <h2 className="text-base font-bold text-primary">Tanggal:</h2>
          <h3 className="text-sm font-medium text-secondary">
            {data ? data.tanggal : "Loading..."}
          </h3>
        </div>
        <div className="mb-2">
          <h2 className="text-base font-bold text-primary">Tempat:</h2>
          <h3 className="text-sm font-medium text-secondary">
            {data ? data.tempat : "Loading..."}
          </h3>
        </div>
        <div className="mt-4">
          <PieChartNilai data={data} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default CardSeminar;
