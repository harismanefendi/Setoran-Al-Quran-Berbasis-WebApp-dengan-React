import React, { useState, useEffect } from "react";
import { ref, get, getDatabase } from "firebase/database";
import { useParams } from "react-router-dom";

const HalamanKelas = () => {
  const [siswa, setSiswa] = useState([]);
  const { kelas } = useParams(); // Dipanggil di bagian atas komponen

  useEffect(() => {
    console.log("Kelas saat ini:", kelas);

    const fetchSiswa = async () => {
      const db = getDatabase();
      const siswaRef = ref(db, "siswa"); // Path ke data siswa
      try {
        const snapshot = await get(siswaRef);
        if (snapshot.exists()) {
          const siswaData = snapshot.val();
          console.log("Data siswa dari Firebase:", siswaData);
          const siswaArray = Object.values(siswaData).filter((s) => s.kelas === kelas);
          console.log(`Siswa di kelas ${kelas}:`, siswaArray);
          setSiswa(siswaArray);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchSiswa();
  }, [kelas]); // Dependensi useEffect

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">Halaman Kelas {kelas}</h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((s, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{s.nama}</td>
              <td className="p-2">{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HalamanKelas;
