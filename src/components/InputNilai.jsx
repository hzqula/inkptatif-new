import React, { useState, useEffect } from "react";
import axios from "axios";

const InputNilai = ({ dataSeminar, userInfo, ket, kat }) => {
  if (!dataSeminar || !userInfo) {
    return null;
  }

  const [kriteria, setKriteria] = useState([]);
  const [nilai, setNilai] = useState([]);
  const [existingNilai, setExistingNilai] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [idKategori, setIdKategori] = useState(null);
  const [idKeterangan, setIdKeterangan] = useState(null);

  useEffect(() => {
    const fetchKriteria = async () => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/input-nilai/kriteria.php?jenis_kategori=${dataSeminar.kategori}&jenis_keterangan=${ket}`
        );
        setKriteria(response.data);
        setNilai(Array(response.data.length).fill(0)); // Inisialisasi nilai dengan panjang data
      } catch (error) {
        console.error("Error fetching kriteria:", error);
      }
    };

    const fetchExistingNilai = async () => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/penilaian/penilaian.php?nip=${userInfo.nip}&nim=${dataSeminar.nim}`
        );
        const data = response.data.penilaian;

        if (data.length > 0) {
          setExistingNilai(data);
          setNilai(data.map((item) => item.nilai));
        }
      } catch (error) {
        console.error("Error fetching existing nilai:", error);
      }
    };

    fetchKriteria();
    fetchExistingNilai();
  }, [dataSeminar.nim, userInfo.nip]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/kategori/kategori.php?jenis=${kat}`
        );
        setIdKategori(response.data.id);
      } catch (error) {
        console.error("Error fetching kategori:", error);
      }
    };

    const fetchKeterangan = async () => {
      try {
        const response = await axios.get(
          `https://inkptatif.xyz/keterangan/keterangan.php?jenis=${ket}`
        );
        setIdKeterangan(response.data.id);
      } catch (error) {
        console.error("Error fetching keterangan:", error);
      }
    };

    fetchKategori();
    fetchKeterangan();
  }, [kat, ket]);

  const handleInputChange = (index, value) => {
    const newNilai = [...nilai];
    newNilai[index] = Math.max(0, Math.min(100, value)); // Ensure value is between 0 and 100
    setNilai(newNilai);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!idKategori || !idKeterangan) {
    //   console.error("Kategori or Keterangan data is missing");
    //   return;
    // }

    try {
      const method = existingNilai.length > 0 ? "put" : "post";
      const url =
        existingNilai.length > 0
          ? "https://inkptatif.xyz/input-nilai/update-nilai.php"
          : "https://inkptatif.xyz/input-nilai/input-nilai.php";

      const response = await axios({
        method,
        url,
        data: {
          id_kriteria: kriteria.map((k) => k.id), // Mengirim array ID kriteria
          nilai: nilai, // Mengirim array nilai
          nip: userInfo.nip, // Kirim nip dosen
          nim: dataSeminar.nim, // Kirim nim mahasiswa
          id_kategori: idKategori, // Sesuaikan dengan jenis_kategori yang diinginkan
          id_keterangan: idKeterangan, // Sesuaikan dengan jenis_keterangan yang diinginkan
        },
      });

      const message = response.data.message;
      setModalMessage(message);
      setModalVisible(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center max-w-xs px-4 py-2 mx-auto"
      >
        {kriteria.map((kriteria, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full py-4 border-t border-primary"
          >
            <label
              htmlFor={`kriteria-${index}`}
              className="text-sm font-bold text-primary"
            >
              {kriteria.penilaian}
            </label>
            <div className="relative flex items-center max-w-[8rem]">
              <button
                type="button"
                onClick={() => handleInputChange(index, nilai[index] - 1)}
                className="flex items-center justify-between h-8 p-3 font-black bg-gray-100 border text-primary hover:text-customWhite hover:bg-primary border-secondary focus:ring-gray-100 focus:ring-2 focus:outline-none active:bg-customRed"
              >
                -
              </button>
              <input
                type="text"
                id={`kriteria-${index}`}
                value={nilai[index]}
                onChange={(e) =>
                  handleInputChange(index, Number(e.target.value))
                }
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-primary text-sm font-extrabold focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                placeholder="0-100"
                required
              />
              <button
                type="button"
                onClick={() => handleInputChange(index, nilai[index] + 1)}
                className="flex items-center justify-between h-8 p-3 font-black bg-gray-100 border text-primary hover:text-customWhite hover:bg-primary border-secondary focus:ring-gray-100 focus:ring-2 focus:outline-none active:bg-customGreen"
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="absolute bottom-0 flex justify-center w-full px-4 py-4 translate-x-1/2 bg-white right-1/2">
          <button
            type="submit"
            className="w-full inline-block px-[20px] py-2 bg-customGreen text-customWhite text-sm font-bold"
          >
            Simpan
          </button>
        </div>
      </form>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded shadow-md">
            <p className="font-bold text-customGreen">{modalMessage}</p>
            <button
              onClick={() => setModalVisible(false)}
              className="px-4 py-2 mt-4 text-white rounded bg-customGreen"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputNilai;
