import React, { useState, useEffect } from "react";
import axios from "axios";
import TableData from "./TableData";
import CardMahasiswa from "./CardMahasiswa";

const Table = ({ userInfo, kat }) => {
  const [datas, setDatas] = useState([]);
  const [keterangan, setKeterangan] = useState("dibimbing");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleDibimbing = () => {
    setKeterangan("dibimbing");
  };

  const handleDiuji = () => {
    setKeterangan("diuji");
  };

  useEffect(() => {
    if (userInfo && userInfo.nip) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://inkptatif.xyz/dosen/dosen.php?nip=${userInfo.nip}`
          );
          if (response.data.length > 0) {
            const mahasiswaData = response.data[0][keterangan].filter(
              (data) => data.kategori.toLowerCase() === kat.toLowerCase()
            );

            const fetchSeminarData = async (nim) => {
              const seminarResponse = await axios.get(
                `https://inkptatif.xyz/seminar/seminar.php?nim=${nim}`
              );
              return seminarResponse.data;
            };

            const seminarDataPromises = mahasiswaData.map((mahasiswa) =>
              fetchSeminarData(mahasiswa.nim)
            );

            const seminarDataResults = await Promise.all(seminarDataPromises);

            const combinedSeminarData = seminarDataResults.flat();
            setDatas(combinedSeminarData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [userInfo, keterangan, kat]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-wrap mb-5">
      <div className="w-full max-w-full mx-auto mb-6">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border bg-white m-5">
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border border-stone-200 bg-light/30">
            <div className="px-4 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent sm:px-9">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0">
                <span className="text-xl font-black text-primary sm:text-2xl">
                  Daftar Mahasiswa <span className="uppercase">{kat}</span>,
                  <span className="text-secondary">
                    {" "}
                    {userInfo ? userInfo.nama : "Loading..."}
                  </span>
                </span>
                <span className="mt-1 text-lg font-medium text-secondary sm:text-lg/normal"></span>
              </h3>
            </div>
            <div className="flex-auto block px-4 py-8 pt-6 sm:px-9">
              <div className="overflow-x-auto">
                <div className="flex justify-center w-full mx-auto mb-16">
                  <button
                    onClick={handleDibimbing}
                    className={`text-primary px-4 font-semibold text-base inline-block py-2 text-[14px] font-primary relative after:contents[''] after:w-full after:h-[4px] after:inline-block after:absolute after:bottom-0 after:left-0 after:bg-primary after:transition-all sm:px-8 sm:text-lg`}
                  >
                    Dibimbing
                  </button>
                  <button
                    onClick={handleDiuji}
                    className={`text-secondary px-4 font-semibold text-base inline-block py-2 text-[14px] font-primary relative after:contents[''] after:w-full after:h-[4px] after:inline-block after:absolute after:bottom-0 after:left-0 after:bg-secondary after:transition-all sm:px-8 sm:text-lg`}
                  >
                    Diuji
                  </button>
                </div>
                {isMobile ? (
                  <div className="flex flex-col">
                    {datas.map((data) => (
                      <CardMahasiswa
                        key={data.id}
                        data={data}
                        ket={keterangan}
                        kat={kat}
                        userInfo={userInfo}
                      />
                    ))}
                  </div>
                ) : (
                  <table className="w-full my-0 align-middle table-fixed border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary">
                        <th className="pl-3 pb-3 text-start min-w-[120px] sm:min-w-[175px]">
                          Judul
                        </th>
                        <th className="pl-3 pb-3 text-start min-w-[80px] sm:min-w-[100px]">
                          Mahasiswa
                        </th>
                        <th className="pb-3 text-center w-[100px] sm:w-[150px]">
                          Keterangan
                        </th>
                        <th className="pb-3 text-center w-[100px] sm:w-[150px]">
                          Tanggal
                        </th>
                        <th className="pb-3 text-center w-[100px] sm:w-[100px]">
                          Status
                        </th>
                        <th className="pb-3 text-center w-[80px] sm:w-[100px]">
                          Rincian
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <TableData
                        datas={datas}
                        ket={keterangan}
                        kat={kat}
                        userInfo={userInfo}
                      />
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
