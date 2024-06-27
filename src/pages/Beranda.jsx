import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Beranda = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [kpDibimbing, setKpDibimbing] = useState(0);
  const [kpDiuji, setKpDiuji] = useState(0);
  const [taDibimbing, setTaDibimbing] = useState(0);
  const [taDiuji, setTaDiuji] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "https://inkptatif.xyz/login.php?app=dosen&action=get",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(localStorage.getItem("token"));
        console.log(response.data);
        setUserInfo(response.data);

        if (response.data && response.data.nip) {
          fetchData(response.data.nip);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    const fetchData = async (nip) => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/dosen/dosen.php?nip=${nip}`
        );
        console.log(response.data);

        if (response.data.length > 0) {
          const dosenData = response.data[0];
          const dibimbing = dosenData.dibimbing;
          const diuji = dosenData.diuji;

          const hitungKPDibimbing = dibimbing.filter(
            (mhs) => mhs.kategori.toLowerCase() === "kp"
          ).length;
          const hitungTADibimbing = dibimbing.filter(
            (mhs) => mhs.kategori.toLowerCase() === "ta"
          ).length;
          const hitungKPDiuji = diuji.filter(
            (mhs) => mhs.kategori.toLowerCase() === "kp"
          ).length;
          const hitungTADiuji = diuji.filter(
            (mhs) => mhs.kategori.toLowerCase() === "ta"
          ).length;

          setKpDibimbing(hitungKPDibimbing);
          setTaDibimbing(hitungTADibimbing);
          setKpDiuji(hitungKPDiuji);
          setTaDiuji(hitungTADiuji);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <Header userInfo={userInfo} />

      <div className="p-4">
        <div className="mb-4 ml-2">
          <h1 className="mb-2 text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl text-primary">
            INKPTA<span className="text-secondary">TIF</span>
          </h1>
          <h2 className="font-semibold text-softPrimary">
            "Aplikasi Input Nilai KP dan TA Teknik Informatika" Aplikasi ini
            berfungsi untuk penginputan nilai untuk dosen pembimbing dan dosen
            penguji, khusus untuk Kerja Praktek dan Tugas Akhir di jurusan
            Teknik Informatika.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 auto-rows-[minmax(180px,_auto)] gap-5">
          <div className="flex flex-col justify-between col-span-1 row-span-1 p-6 bg-white border shadow-md sm:col-span-2 lg:col-span-3 lg:row-span-2 border-gray shadow-black/7">
            <div className="p-4">
              <div className="mb-4 ml-2">
                <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl md:text-4xl text-primary">
                  Assalamu'alaikum wr. wb.
                </h1>
                <h1 className="mb-2 text-xl font-bold sm:text-2xl md:text-3xl text-primary">
                  Selamat datang
                  <span className="text-secondary">
                    {" "}
                    {userInfo ? userInfo.nama : "Loading..."}
                  </span>
                </h1>
                <h2 className="font-semibold text-softPrimary">
                  Silakan menginput nilai kerja praktek atau tugas akhir dari
                  mahasiswa yang Anda bimbing atau uji.
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Link to="/kp">
                <div className="relative col-span-1 row-span-1 p-6 overflow-hidden border shadow-md group bg-customGreen border-gray shadow-black/7">
                  <div className="absolute z-0 transition-all duration-700 transform rounded-full w-60 h-60 -bottom-28 -right-24 bg-primary bg-opacity-20 group-hover:w-80 group-hover:h-80 group-hover:-right-16 group-hover:-bottom-44"></div>
                  <h1 className="relative z-10 mb-2 text-lg font-bold text-center text-customWhite">
                    Input Nilai KP
                  </h1>
                </div>
              </Link>
              <Link to="/ta">
                <div className="relative col-span-1 row-span-1 p-6 overflow-hidden border shadow-md group bg-customGreen border-gray shadow-black/7">
                  <div className="absolute z-0 transition-all duration-700 transform rounded-full w-60 h-60 -bottom-28 -right-24 bg-primary bg-opacity-20 group-hover:w-80 group-hover:h-80 group-hover:-right-16 group-hover:-bottom-44"></div>
                  <h1 className="relative z-10 mb-2 text-lg font-bold text-center text-customWhite">
                    Input Nilai TA
                  </h1>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-span-1 row-span-1 p-6 bg-white border shadow-md sm:col-span-2 lg:col-span-2 lg:row-span-2 border-gray shadow-black/7">
            <h1 className="mb-2 text-lg font-black sm:text-xl text-primary">
              Rincian
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-[minmax(180px,_auto)] gap-4">
              <div className="relative col-span-1 row-span-1 p-6 overflow-hidden bg-white border shadow-md border-gray shadow-black/7">
                <h1 className="mb-2 text-lg font-black sm:text-xl text-primary">
                  Mahasiswa KP
                </h1>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-secondary">
                      Dibimbing
                    </h2>
                  </div>
                </div>
                <div className="absolute z-0 transform rounded-full w-60 h-60 -bottom-28 -right-24 bg-primary bg-opacity-20"></div>
                <h1 className="relative z-10 mb-2 text-lg font-black text-right text-primary">
                  Total: {kpDibimbing}
                </h1>
              </div>
              <div className="relative col-span-1 row-span-1 p-6 overflow-hidden bg-white border shadow-md border-gray shadow-black/7">
                <h1 className="mb-2 text-lg font-black sm:text-xl text-primary">
                  Mahasiswa KP
                </h1>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-secondary">
                      Diuji
                    </h2>
                  </div>
                </div>
                <div className="absolute z-0 transform rounded-full w-60 h-60 -bottom-28 -right-24 bg-primary bg-opacity-20"></div>
                <h1 className="relative z-10 mb-2 text-lg font-black text-right text-primary">
                  Total: {kpDiuji}
                </h1>
              </div>
              <div className="relative col-span-1 row-span-1 p-6 overflow-hidden bg-white border shadow-md border-gray shadow-black/7">
                <h1 className="mb-2 text-lg font-black sm:text-xl text-primary">
                  Mahasiswa TA
                </h1>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-secondary">
                      Dibimbing
                    </h2>
                  </div>
                </div>
                <div className="absolute z-0 transform rounded-full w-60 h-60 -bottom-28 -right-24 bg-primary bg-opacity-20"></div>
                <h1 className="relative z-10 mb-2 text-lg font-black text-right text-primary">
                  Total: {taDibimbing}
                </h1>
              </div>
              <div className="relative col-span-1 row-span-1 p-6 overflow-hidden bg-white border shadow-md border-gray shadow-black/7">
                <h1 className="mb-2 text-lg font-black sm:text-xl text-primary">
                  Mahasiswa TA
                </h1>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-secondary">
                      Diuji
                    </h2>
                  </div>
                </div>
                <div className="absolute z-0 transform rounded-full w-60 h-60 -bottom-28 -right-24 bg-primary bg-opacity-20"></div>
                <h1 className="relative z-10 mb-2 text-lg font-black text-right text-primary">
                  Total: {taDiuji}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beranda;
