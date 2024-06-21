import React from "react";

const CardSeminar = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div>
        <h1 className="mb-2 text-xl font-black text-primary">Seminar KP</h1>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="w-3/5 text-base font-bold text-primary">
              Muhammad Dhimas Hadid Fachrezy
            </h2>
            <h2 className="text-sm font-medium text-secondary">12250111791</h2>
          </div>
          <div className="w-10 h-10 overflow-hidden ">
            <img
              src="noavatar.png"
              alt="profil"
              className="border rounded-full border-secondary"
            />
          </div>
        </div>
        <div className="mb-2">
          <h2 className="text-base font-bold text-primary">Judul:</h2>
          <h3 className="text-sm font-medium text-secondary">
            Perancangan Rancangan
          </h3>
        </div>
        <div className="mb-2">
          <h2 className="text-base font-bold text-primary">Tanggal:</h2>
          <h3 className="text-sm font-medium text-secondary">26 Juni 2024</h3>
        </div>
        <div className="mb-2">
          <h2 className="text-base font-bold text-primary">Tempat:</h2>
          <h3 className="text-sm font-medium text-secondary">FST. 303</h3>
        </div>
      </div>
    </div>
  );
};

export default CardSeminar;
