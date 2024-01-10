import React, { useState, useEffect } from "react";
import { ref, get, getDatabase, update, remove } from "firebase/database";
import { useParams } from "react-router-dom";

const HalamanKelas = () => {
  const [siswa, setSiswa] = useState([]);
  const [kelasOptions, setKelasOptions] = useState(["1", "2", "3", "4", "5", "6"]); // Pilihan kelas
  const { kelas } = useParams();

  useEffect(() => {
    const fetchSiswa = async () => {
      const db = getDatabase();
      const siswaRef = ref(db, "siswa");
      try {
        const snapshot = await get(siswaRef);
        if (snapshot.exists()) {
          const siswaData = snapshot.val();
          const siswaArray = Object.values(siswaData).filter((s) => s.kelas === kelas);
          setSiswa(siswaArray);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchSiswa();
  }, [kelas]);

  const handleEdit = async (uid) => {
    const currentStudent = siswa.find((student) => student.email.replace(/[.$#[\]]/g, ",") === uid);
    if (!currentStudent) {
      alert("Student not found");
      return;
    }

    let newName = prompt("Enter new name:", currentStudent.name);
    let newKelas = prompt("Enter new class:", currentStudent.kelas);

    if (newName !== null && newName !== "") {
      const db = getDatabase();
      const studentRef = ref(db, `siswa/${uid.replace(/[.$#[\]]/g, ",")}`);

      try {
        await update(studentRef, { name: newName, kelas: newKelas }); // Perbarui nama dan kelas
        setSiswa((prevSiswa) => prevSiswa.map((student) => (student.email.replace(/[.$#[\]]/g, ",") === uid ? { ...student, name: newName, kelas: newKelas } : student)));
      } catch (error) {
        console.error("Error updating student:", error);
      }
    }
  };

  const handleDelete = async (uid) => {
    const isConfirmed = confirm("Are you sure you want to delete this student?");
    if (isConfirmed) {
      const db = getDatabase();
      const studentRef = ref(db, `siswa/${uid.replace(/[.$#[\]]/g, ",")}`);
      try {
        await remove(studentRef);
        setSiswa((prevSiswa) => prevSiswa.filter((student) => student.email.replace(/[.$#[\]]/g, ",") !== uid));
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">Halaman Kelas {kelas}</h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((s) => (
            <tr key={s.email.replace(/[.$#[\]]/g, ",")} className="border-b">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(s.email.replace(/[.$#[\]]/g, ","))} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(s.email.replace(/[.$#[\]]/g, ","))} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HalamanKelas;
