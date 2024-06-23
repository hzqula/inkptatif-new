import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Beranda = () => {
  const [userInfo, setUserInfo] = useState(null);

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
        console.log("test");
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        // Lakukan penanganan error lain di sini
      }
    };

    console.log(userInfo);
    fetchUserInfo();
  }, []);

  return (
    <>
      <Header userInfo={userInfo} />

      <div className="p-4">
        <div className="mb-4 ml-2">
          <h1 className="mb-2 text-6xl font-black text-primary">
            INKPTA<span className="text-secondary">TIF</span>
          </h1>
          <h2 className="font-semibold text-softPrimary">
            "Aplikasi Input Nilai KP dan TA Teknik Informatika" Aplikasi ini
            berfungsi untuk penginputan nilai untuk dosen pembimbing dan dosen
            penguji, khusus untuk Kerja Praktek dan Tugas Akhir di jurusan
            Teknik Informatika.
          </h2>
        </div>
        <div className="grid grid-cols-5 auto-rows-[minmax(180px,_auto)] gap-5">
          <div className="flex flex-col justify-between col-span-3 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <div className="p-4">
              <div className="mb-4 ml-2">
                <h1 className="mb-2 text-4xl font-extrabold text-primary">
                  Assalamu'alaikum wr. wb.
                </h1>
                <h1 className="mb-2 text-3xl font-bold text-primary">
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
              <Link to="/input-nilai-kp/">
                <div className="relative col-span-1 row-span-1 p-6 overflow-hidden border rounded-md shadow-md group bg-customGreen border-gray shadow-black/7">
                  <div className="absolute z-0 transition-all duration-700 transform rounded-full w-60 h-60 -bottom-28 -right-24 bg-primary bg-opacity-20 group-hover:w-80 group-hover:h-80 group-hover:-right-16 group-hover:-bottom-44"></div>
                  <h1 className="relative z-10 mb-2 text-lg font-bold text-center text-customWhite">
                    Input Nilai KP
                  </h1>
                </div>
              </Link>
              <Link to="/input-nilai-ta/">
                <div className="relative col-span-1 row-span-1 p-6 overflow-hidden border rounded-md shadow-md group bg-customGreen border-gray shadow-black/7">
                  <div className="absolute z-0 transition-all duration-700 transform rounded-full w-60 h-60 -bottom-28 -right-24 bg-primary bg-opacity-20 group-hover:w-80 group-hover:h-80 group-hover:-right-16 group-hover:-bottom-44"></div>
                  <h1 className="relative z-10 mb-2 text-lg font-bold text-center text-customWhite">
                    Input Nilai TA
                  </h1>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-span-2 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <h1 className="mb-2 text-xl font-black text-primary">Rincian</h1>
            <div className="grid grid-cols-2 auto-rows-[minmax(180px,_auto)] gap-4">
              <div className="relative col-span-1 row-span-1 p-6 overflow-hidden bg-white border rounded-md shadow-md border-gray shadow-black/7">
                <h1 className="mb-2 text-xl font-black text-primary">
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
                  Total: 10
                </h1>
              </div>
              <div className="relative col-span-1 row-span-1 p-6 overflow-hidden bg-white border rounded-md shadow-md border-gray shadow-black/7">
                <h1 className="mb-2 text-xl font-black text-primary">
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
                  Total: 10
                </h1>
              </div>
              <div className="relative col-span-1 row-span-1 p-6 overflow-hidden bg-white border rounded-md shadow-md border-gray shadow-black/7">
                <h1 className="mb-2 text-xl font-black text-primary">
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
                  Total: 10
                </h1>
              </div>
              <div className="relative col-span-1 row-span-1 p-6 overflow-hidden bg-white border rounded-md shadow-md border-gray shadow-black/7">
                <h1 className="mb-2 text-xl font-black text-primary">
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
                  Total: 10
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
