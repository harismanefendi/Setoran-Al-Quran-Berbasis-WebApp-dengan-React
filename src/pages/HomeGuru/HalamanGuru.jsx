import React, { useState, useEffect } from "react";
import { ref as dbRef, db, set } from "../../config/firebase/index";
import { onValue } from "firebase/database";
import "tailwindcss/tailwind.css";

const HalamanGuru = () => {
  const [setoranList, setSetoranList] = useState([]);

  useEffect(() => {
    const setoranRef = dbRef(db, "setoran");
    onValue(setoranRef, (snapshot) => {
      let setoranArray = [];
      const data = snapshot.val();
      if (data) {
        for (const email in data) {
          for (const id in data[email]) {
            setoranArray.push({
              id,
              emailKey: email, // Simpan emailKey untuk penggunaan nanti
              ...data[email][id],
            });
          }
        }
        setSetoranList(setoranArray);
      }
    });
  }, []);

  const handleFeedback = (emailKey, idSetoran) => {
    const rate = prompt("Berikan rating untuk setoran ini (1-5):");
    const comment = prompt("Tambahkan komentar untuk setoran ini:");

    if (rate && comment) {
      saveFeedback(emailKey, idSetoran, rate, comment);
    }
  };

  const saveFeedback = (emailKey, idSetoran, rate, comment) => {
    const feedbackRef = dbRef(db, `feedbackSetoran/${emailKey}/${idSetoran}`);
    set(feedbackRef, { rating: rate, komentar: comment })
      .then(() => alert("Feedback berhasil disimpan"))
      .catch((error) => console.error("Error menyimpan feedback:", error));
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-gray-800">Daftar Setoran Siswa</p>
      </div>
      <div>
        {setoranList.map((setoran) => (
          <div key={setoran.id} className="border-b border-gray-200 py-4 last:border-b-0">
            <p className="text-gray-700 font-medium">Nama: {setoran.namaPeserta}</p>
            <p className="text-gray-600">Email: {setoran.email}</p>
            <p className="text-gray-600">Kelas: {setoran.kelas}</p>
            <p className="text-gray-600">
              Surat: {setoran.suratAwal} ayat {setoran.ayatAwal} sampai {setoran.suratAkhir} ayat {setoran.ayatAkhir}
            </p>
            <div className="my-3 flex justify-center">
              <video width="320" height="240" controls>
                <source src={setoran.uploadedFileUrl} type="video/mp4" />
              </video>
            </div>
            <div className="flex justify-end mt-2 font-semibold">
              <button onClick={() => handleFeedback(setoran.emailKey, setoran.id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                Keputusan
              </button>
              {/* Tombol untuk feedback "Ulangi" jika diperlukan */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HalamanGuru;
