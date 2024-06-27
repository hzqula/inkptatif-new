import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";
import Header from "../components/Header";

const KP = () => {
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

        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        // Lakukan penanganan error lain di sini
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <Header userInfo={userInfo} />

      <div className="p-4">
        <div className="mb-4 ml-2">
          <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl text-primary">
            Selamat datang di halaman Input Nilai KP,
            <span className="text-secondary">
              {" "}
              {userInfo ? userInfo.nama : "Loading..."}
            </span>
          </h1>
          <h2 className="font-semibold text-softPrimary">
            menginput nilai
            <span className="font-extrabold"> kerja praktek</span> dari
            mahasiswa yang Anda bimbing atau uji.
          </h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table userInfo={userInfo} kat="kp" />
      </div>
    </>
  );
};

export default KP;
