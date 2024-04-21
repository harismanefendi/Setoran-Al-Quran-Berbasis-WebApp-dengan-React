import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ref as dbRef, db } from "../../config/firebase/index";
import { onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const Setoran = () => {
  const [setoranList, setSetoranList] = useState([]);
  const { kelas } = useParams();
  const [jumlahSetoranSiswa, setJumlahSetoranSiswa] = useState({});
  const [selectedSiswa, setSelectedSiswa] = useState(null);

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

  const downloadPdf = () => {
    const doc = new jsPDF();
    const tableColumn = ["Nama Peserta", "Tanggal Upload", "Surat Awal", "Ayat Awal", "Surat Akhir", "Ayat Akhir", "Status"];
    const tableRows = [];

    setoranList.forEach((setoran) => {
      const formattedDate = format(new Date(setoran.tanggalUpload), "EEEE, d MMMM yyyy");
      const setoranData = [setoran.namaPeserta, formattedDate, setoran.suratAwal, setoran.ayatAwal, setoran.suratAkhir, setoran.ayatAkhir, setoran.status];
      tableRows.push(setoranData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text(`Daftar Setoran Siswa Kelas ${kelas}`, 14, 15);
    doc.save(`setoran_kelas_${kelas}.pdf`);
  };

  const toggleDetail = (namaPeserta) => {
    console.log("Selected siswa:", namaPeserta);
    setSelectedSiswa((prevSelectedSiswa) => (prevSelectedSiswa === namaPeserta ? null : namaPeserta));
  };

  console.log(setoranList); // Tambahkan ini untuk memeriksa isi setoranList

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-gray-800">Daftar Setoran Siswa Kelas {kelas}</p>
      </div>
      <button onClick={downloadPdf} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download PDF
      </button>
      <div>
        {setoranList.length > 0 && (
          <div className="space-y-4">
            {Object.keys(jumlahSetoranSiswa).map((namaPeserta, index) => (
              <div key={index} className="border rounded p-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDetail(namaPeserta)}>
                  <p className="text-lg font-semibold">Nama: {namaPeserta}</p>
                  <p>Jumlah Setoran Diterima: {jumlahSetoranSiswa[namaPeserta]}</p>
                </div>
                {selectedSiswa === namaPeserta && (
                  <div className="mt-2 p-4 bg-gray-100 rounded-md">
                    <p className="text-sm font-semibold">Detail Setoran:</p>
                    {setoranList
                      .filter((setoran) => setoran.namaPeserta === namaPeserta)
                      .map((setoran, index) => (
                        <div key={index} className="mt-2">
                          <p>Tanggal Upload: {format(new Date(setoran.tanggal), "EEEE, d MMMM yyyy")}</p>
                          <p>
                            Surat Awal: {setoran.suratAwal}, Ayat Awal: {setoran.ayatAwal}
                          </p>
                          <p>
                            Surat Akhir: {setoran.suratAkhir}, Ayat Akhir: {setoran.ayatAkhir}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Setoran;
