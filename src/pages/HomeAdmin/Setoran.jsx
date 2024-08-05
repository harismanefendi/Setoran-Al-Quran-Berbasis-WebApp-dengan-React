import React, { useState, useEffect } from "react";
import { ref as dbRef, db } from "../../config/firebase/index";
import { onValue } from "firebase/database";
import { useParams, Link } from "react-router-dom";
import { format, isValid } from "date-fns";

const Setoran = () => {
  const [setoranList, setSetoranList] = useState([]);
  const { kelas } = useParams();
  const [jumlahSetoranSiswa, setJumlahSetoranSiswa] = useState({});

  useEffect(() => {
    const setoranRef = dbRef(db, "setoran");
    onValue(setoranRef, (snapshot) => {
      let setoranArray = [];
      const data = snapshot.val();
      if (data) {
        for (const email in data) {
          for (const id in data[email]) {
            const setoran = data[email][id];
            if (setoran.kelas === kelas && setoran.status === "Diterima") {
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
    console.log("Setoran list telah di-update pada tanggal:", new Date().toLocaleDateString());
  }, [kelas]);

  useEffect(() => {
    const jumlahSetoran = {};
    setoranList.forEach((setoran) => {
      jumlahSetoran[setoran.namaPeserta] = (jumlahSetoran[setoran.namaPeserta] || 0) + 1;
    });
    setJumlahSetoranSiswa(jumlahSetoran);
    console.log("Jumlah setoran siswa telah dihitung pada tanggal:", new Date().toLocaleDateString());
  }, [setoranList]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-gray-800">Daftar Setoran Siswa Kelas {kelas}</p>
      </div>
      <div className="flex justify-end mb-4">
        <Link to="/laporanperkelas" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Laporan Seluruh Siswa
        </Link>
      </div>
      <div className="overflow-x-auto">
        {setoranList.length > 0 ? (
          <div className="sm:hidden">
            {setoranList.map((setoran, index) => {
              const tanggal = new Date(setoran.tanggal);
              const isTanggalValid = isValid(tanggal);
              return (
                <div key={index} className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
                  <p>
                    <strong>Nama Peserta:</strong> {setoran.namaPeserta}
                  </p>
                  <p>
                    <strong>Tanggal Upload:</strong> {isTanggalValid ? format(tanggal, "EEEE, d MMMM yyyy") : "Tanggal tidak valid"}
                  </p>
                  <p>
                    <strong>Surat:</strong> {setoran.suratAwal}
                  </p>
                  <p>
                    <strong>Ayat Awal:</strong> {setoran.ayatAwal}
                  </p>
                  <p>
                    <strong>Ayat Akhir:</strong> {setoran.ayatAkhir}
                  </p>
                  <p>
                    <strong>Status:</strong> {setoran.status}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">Tidak ada setoran untuk kelas ini.</p>
        )}
        <div className="hidden sm:block">
          {setoranList.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Peserta
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Upload
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Surat
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ayat Awal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ayat Akhir
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {setoranList.map((setoran, index) => {
                  const tanggal = new Date(setoran.tanggal);
                  const isTanggalValid = isValid(tanggal);
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{setoran.namaPeserta}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{isTanggalValid ? format(tanggal, "EEEE, d MMMM yyyy") : "Tanggal tidak valid"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{setoran.suratAwal}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{setoran.ayatAwal}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{setoran.ayatAkhir}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{setoran.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">Tidak ada setoran untuk kelas ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setoran;
