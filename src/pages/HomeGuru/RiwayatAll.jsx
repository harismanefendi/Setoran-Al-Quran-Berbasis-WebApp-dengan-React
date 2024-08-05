import React, { useState, useEffect } from "react";
import { ref as dbRef, db, set, remove } from "../../config/firebase/index";
import { onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";

const RiwayatAll = () => {
  const [setoranList, setSetoranList] = useState([]);
  const [editingSetoran, setEditingSetoran] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const { kelas } = useParams();

  useEffect(() => {
    const setoranRef = dbRef(db, "setoran");
    onValue(setoranRef, (snapshot) => {
      let setoranArray = [];
      const data = snapshot.val();
      if (data) {
        for (const email in data) {
          for (const id in data[email]) {
            const setoran = data[email][id];
            if (setoran.kelas === kelas) {
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
  }, [kelas]);

  const handleEditClick = (setoran) => {
    setEditingSetoran(setoran.id);
    setEditedValues(setoran);
  };

  const handleDeleteClick = (emailKey, idSetoran) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus setoran ini?");
    if (confirmDelete) {
      const setoranRef = dbRef(db, `setoran/${emailKey}/${idSetoran}`);
      remove(setoranRef)
        .then(() => {
          alert("Setoran berhasil dihapus");
        })
        .catch((error) => console.error("Error deleting setoran:", error));
    }
  };

  const handleSaveClick = (emailKey, idSetoran) => {
    const setoranRef = dbRef(db, `setoran/${emailKey}/${idSetoran}`);
    set(setoranRef, editedValues)
      .then(() => {
        alert("Setoran berhasil diperbarui");
        setEditingSetoran(null);
      })
      .catch((error) => console.error("Error updating setoran:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({
      ...editedValues,
      [name]: value,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-gray-800">Daftar Setoran Siswa Kelas {kelas}</p>
      </div>
      <div>
        {setoranList.map((setoran) => (
          <div key={setoran.id} className="border-b border-gray-200 py-4 last:border-b-0">
            {editingSetoran === setoran.id ? (
              <div>
                <label className="block text-gray-700">Nama:</label>
                <input type="text" name="namaPeserta" value={editedValues.namaPeserta} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                <label className="block text-gray-700">Juz:</label>
                <input type="text" name="juz" value={editedValues.juz} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                <label className="block text-gray-700">Surat dan Ayat:</label>
                <input type="text" name="suratAwal" value={editedValues.suratAwal} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                <input type="text" name="ayatAwal" value={editedValues.ayatAwal} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                <input type="text" name="suratAkhir" value={editedValues.suratAkhir} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                <input type="text" name="ayatAkhir" value={editedValues.ayatAkhir} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                <label className="block text-gray-700">Status:</label>
                <select name="status" value={editedValues.status} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                  <option value="Diterima">Diterima</option>
                  <option value="Diulangi">Diulangi</option>
                </select>
                <div className="flex justify-end mt-2">
                  <button onClick={() => handleSaveClick(setoran.emailKey, setoran.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mr-2">
                    Simpan
                  </button>
                  <button onClick={() => setEditingSetoran(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 font-medium">Nama: {setoran.namaPeserta}</p>
                <p className="text-gray-600">Juz: {setoran.juz}</p>
                <p className="text-gray-600">Input Value: {setoran.inputValue}</p>
                <p className="text-gray-600">
                  Surat: {setoran.suratAwal} ayat {setoran.ayatAwal} sampai {setoran.suratAkhir} ayat {setoran.ayatAkhir}
                </p>
                <p className="text-gray-600">Status: {setoran.status}</p>
                <div className="my-3 flex justify-center">
                  <video width="320" height="240" controls>
                    <source src={setoran.uploadedFileUrl} type="video/mp4" />
                  </video>
                </div>
                <div className="flex justify-end mt-2 font-semibold">
                  <button onClick={() => handleEditClick(setoran)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(setoran.emailKey, setoran.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiwayatAll;
