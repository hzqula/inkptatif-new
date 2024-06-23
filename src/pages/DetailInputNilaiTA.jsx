import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import CardSeminar from "../components/CardSeminar";
import CardNilai from "../components/CardNilai";
import axios from "axios";
import Header from "../components/Header";
import CardDospem from "../components/CardDospem";
import CardDosuji from "../components/CardDosuji";
import AreaChartNilai from "../components/AreaChartNilai";

const DetailInputNilaiTA = () => {
  const { nim } = useParams(); // Ambil nim dari parameter URL
  const [userInfo, setUserInfo] = useState(null);
  const [seminarData, setSeminarData] = useState(null);
  const location = useLocation();
  const { ket, kat } = location.state || {};

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
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchSeminarData = async () => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/seminar/seminar.php?nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSeminarData(response.data);
      } catch (error) {
        console.error("Failed to fetch seminar data:", error);
      }
    };

    if (nim) {
      fetchSeminarData();
    }
  }, [nim]);

  if (!userInfo || !seminarData) {
    return null;
  }

  return (
    <>
      <Header userInfo={userInfo} />

      <div className="p-4">
        <div className="mb-4 ml-2">
          <h1 className="mb-2 text-3xl font-extrabold text-primary">
            Kerja <span className="text-secondary">Praktek</span>
          </h1>
          <h2 className="font-semibold text-softPrimary">
            menginput nilai kerja praktek mahasiswa yang Anda bimbing atau uji.
          </h2>
        </div>
        <div className="grid grid-cols-4 auto-rows-[minmax(180px,_auto)] gap-5">
          <div className="col-span-1 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <CardSeminar data={seminarData} userInfo={userInfo} />
          </div>

          {seminarData &&
            seminarData.pembimbing &&
            seminarData.pembimbing.map((dospem, index) => (
              <div
                key={index}
                className="col-span-1 row-span-1 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7"
              >
                <CardDospem
                  dataDosen={dospem}
                  ket="Pembimbing"
                  dataSeminar={seminarData}
                />
              </div>
            ))}

          <div className="relative col-span-1 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <CardNilai
              dataSeminar={seminarData}
              userInfo={userInfo}
              ket={ket}
              kat={kat}
            />
          </div>

          {seminarData &&
            seminarData.penguji &&
            seminarData.penguji.map((dosuji, index) => (
              <div
                key={index}
                className="col-span-1 row-span-1 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7"
              >
                <CardDosuji
                  dataDosen={dosuji}
                  ket="Penguji"
                  dataSeminar={seminarData}
                />
              </div>
            ))}

          <div className="col-span-2 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <AreaChartNilai userInfo={userInfo} data={seminarData} />
          </div>
          <div className="col-span-2 row-span-2 p-6 bg-white border rounded-md shadow-md border-gray shadow-black/7">
            <AreaChartNilai />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailInputNilaiTA;
