import React, { useState, useEffect } from "react";
import { push, ref as dbRef, db } from "../config/firebase";
import { onValue } from "firebase/database";
import FileUpload from "./FileUpload";
import data from "../data/data.json";
import { useNavigate } from "react-router-dom";

const QuranSetoranForm = () => {
  const [namaPeserta, setNamaPeserta] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [suratAwal, setSuratAwal] = useState("");
  const [ayatAwal, setAyatAwal] = useState("");
  const [suratAkhir, setSuratAkhir] = useState("");
  const [ayatAkhir, setAyatAkhir] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [juz, setJuz] = useState("1");
  const [namaUstadz, setNamaUstadz] = useState("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Belum Diperiksa");

  const navigate = useNavigate();

  const juzOptions = [];
  for (let i = 1; i <= 30; i++) {
    juzOptions.push(
      <option key={i} value={i}>
        Juz {i}
      </option>
    );
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      const emailKey = storedUser.email.replace(".", ",");
      const userRef = dbRef(db, `siswa/${emailKey}`);

      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setNamaPeserta(userData.name || "");
          setEmail(userData.email.replace(",", "."));
          setKelas(userData.kelas || "");
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handleFileUpload = (url) => {
    setUploadedFileUrl(url);
  };

  const validateForm = () => {
    if (!email || !suratAwal || !ayatAwal || !suratAkhir || !ayatAkhir) {
      setError("Semua field wajib diisi kecuali lampiran video.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    if (!uploadedFileUrl) {
      alert("Please upload a file before submitting the form.");
      return;
    }

    const emailKey = email.replace(".", ",");
    const dataToPush = {
      namaPeserta,
      email,
      kelas,
      suratAwal,
      ayatAwal,
      suratAkhir,
      ayatAkhir,
      inputValue, // Updated to use inputValue
      juz,
      namaUstadz,
      uploadedFileUrl,
      status,
    };

    const setoranRef = dbRef(db, `setoran/${emailKey}`);
    push(setoranRef, dataToPush)
      .then(() => {
        alert("Sukses setor ayat!");
        navigate("/home/login");
      })
      .catch((error) => {
        console.error("Error menyimpan setoran:", error);
        setError("Gagal menyimpan setoran. Silakan coba lagi.");
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="w-full max-w-lg mx-auto mt-4 p-4 bg-white rounded-lg shadow">
      <div className="text-center">
        <p className="text-center mt-4 text-gray-600">Ini adalah halaman untuk setoran rekaman, silakan isi kolom yang tersedia dengan benar dan tepat.</p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="namaPeserta" className="block text-gray-600">
            Nama Peserta:
          </label>
          <input type="text" id="namaPeserta" value={namaPeserta} onChange={(e) => setNamaPeserta(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400" required />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email:
          </label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400" required />
        </div>

        <div className="mb-4">
          <label htmlFor="kelas" className="block text-gray-600">
            Kelas:
          </label>
          <input type="text" id="kelas" value={kelas} onChange={(e) => setKelas(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400" disabled />
        </div>

        <div>
          <div className="mb-4">
            <label htmlFor="suratAwal" className="block text-gray-600">
              Surat Awal:
            </label>
            <select id="suratAwal" value={suratAwal} onChange={(e) => setSuratAwal(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400" required>
              <option value="">Pilih Surat Awal</option>
              {data.surahs.map((surah) => (
                <option key={surah.number} value={surah.name}>
                  {surah.number}. {surah.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="ayatAwal" className="block text-gray-600">
            Ayat Awal:
          </label>
          <div className="flex items-center">
            <input type="number" id="ayatAwal" value={ayatAwal} onChange={(e) => setAyatAwal(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400" min="1" max="286" required />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="suratAkhir" className="block text-gray-600">
            Surat Akhir:
          </label>
          <select id="suratAkhir" value={suratAkhir} onChange={(e) => setSuratAkhir(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400" required>
            <option value="">Pilih Surat Akhir</option>
            {data.surahs.map((surah) => (
              <option key={surah.number} value={surah.name}>
                {surah.number}. {surah.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="ayatAkhir" className="block text-gray-600">
            Ayat Akhir:
          </label>
          <div className="flex items-center">
            <input type="number" id="ayatAkhir" value={ayatAkhir} onChange={(e) => setAyatAkhir(e.target.value)} className="w-full px-4 py-2 border rounded-l focus:outline-none focus:border-blue-400" min="1" max="286" required />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Halaman Awal:</label>
          <div className="flex items-center">
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Tambahkan Angka Di Sini" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="juz" className="block text-gray-600">
            Pilihan Juz:
          </label>
          <select id="juz" value={juz} onChange={(e) => setJuz(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400" required>
            {juzOptions}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-600">
            Status:
          </label>
          <input type="text" id="status" value={status} className="w-full px-4 py-2 border rounded focus:outline-none" readOnly />
        </div>

        <div className="mb-4">
          <label htmlFor="namaUstadz" className="block text-gray-600">
            Nama Ustadz:
          </label>
          <input type="text" id="namaUstadz" value={namaUstadz} onChange={(e) => setNamaUstadz(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Upload File:</label>
          <FileUpload onFileUpload={handleFileUpload} uploadProgress={setUploadProgress} />
          {uploadProgress > 0 && (
            <div className="text-center mt-2">
              <progress value={uploadProgress} max="100"></progress>
              <p>{Math.round(uploadProgress)}% Complete</p>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={!uploadedFileUrl}>
            Setorkan Al-Quran
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuranSetoranForm;
