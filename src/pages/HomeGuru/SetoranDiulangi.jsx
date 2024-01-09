import React, { useState, useEffect } from "react";
import { ref as dbRef, db } from "../../config/firebase/index";
import { onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";

const SetoranDiulangi = () => {
  const [setoranList, setSetoranList] = useState([]);
  const { kelas } = useParams(); // Mengambil kelas dari URL

  useEffect(() => {
    const setoranRef = dbRef(db, "setoran");
    onValue(setoranRef, (snapshot) => {
      let setoranArray = [];
      const data = snapshot.val();
      if (data) {
        for (const email in data) {
          for (const id in data[email]) {
            const setoran = data[email][id];
            if (setoran.kelas === kelas && setoran.status === "Diulangi") {
              // Menyaring berdasarkan kelas dan status 'Diulangi'
              setoranArray.push({
                id,
                emailKey: email,
                ...setoran,
              });
            }
          }
        }
        setSetoranList(setoranArray);
      }
    });
  }, [kelas]); // Menambah kelas sebagai dependency

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-gray-800">Daftar Setoran Diulangi Siswa Kelas {kelas}</p>
      </div>
      <div>
        {setoranList.map((setoran) => (
          <div key={setoran.id} className="border-b border-gray-200 py-4 last:border-b-0">
            <p className="text-gray-700 font-medium">Nama: {setoran.namaPeserta}</p>
            <p className="text-gray-600">Juz: {setoran.juz}</p>
            <p className="text-gray-600">
              Surat: {setoran.suratAwal} ayat {setoran.ayatAwal} sampai {setoran.suratAkhir} ayat {setoran.ayatAkhir}
            </p>
            <p className="text-gray-600">Status: {setoran.status}</p>
            {/* Komponen video dihapus */}
            {/* Tombol atau aksi tambahan jika diperlukan */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetoranDiulangi;
