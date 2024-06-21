import React from "react";
import Grafik from "../components/Grafik";
import CardDosen from "../components/CardDosen";
import Header from "../components/Header";
import CardSeminar from "../components/CardSeminar";
import CardNilai from "../components/CardNilai";

const Beranda = () => {
  return (
    <>
      <Header />

      <div className="p-4">
        <div className="mb-4 ml-2">
          <h1 className="mb-2 text-3xl font-extrabold text-primary">
            Kerja <span className="text-secondary">Praktek</span>
          </h1>
          <h2 className="font-semibold text-softPrimary">
            Silakan menginput nilai kerja praktek mahasiswa yang Anda bimbing
            atau uji.
          </h2>
        </div>
        <div className="grid grid-cols-4 auto-rows-[minmax(180px,_auto)] gap-5">
          <div className="col-span-1 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <CardSeminar />
          </div>
          <div className="col-span-1 row-span-1 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <CardDosen nama="Iis Afryanti" ket="Pembimbing" />
          </div>
          <div className="col-span-1 row-span-1 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <CardDosen nama="Fitri Insani" ket="Pembimbing" />
          </div>
          <div className="relative col-span-1 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <CardNilai />
          </div>
          <div className="col-span-1 row-span-1 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <CardDosen nama="Jasril" ket="Penguji" />
          </div>
          <div className="col-span-1 row-span-1 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <CardDosen nama="Muhammad Affandes" ket="Penguji" />
          </div>
          <div className="col-span-2 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <Grafik />
          </div>
          <div className="col-span-2 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <Grafik />
          </div>
        </div>
      </div>
    </>
  );
};

export default Beranda;
