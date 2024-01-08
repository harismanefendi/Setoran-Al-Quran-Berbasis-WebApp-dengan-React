import React, { useState, useEffect } from "react";
import { ref, get, getDatabase, update, remove } from "firebase/database";
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

  const handleEdit = async (uid) => {
    // Retrieve the current data of the student
    const currentStudent = siswa.find((student) => student.uid === uid);
    if (!currentStudent) {
      alert("Student not found");
      return;
    }

    // Prompt the admin to enter new values
    let newName = prompt("Enter new name:", currentStudent.nama);
    let newEmail = prompt("Enter new email:", currentStudent.email);

    // Check if the admin actually entered some data
    if (newName !== null && newEmail !== null) {
      const db = getDatabase();
      const studentRef = ref(db, `siswa/${uid}`);

      try {
        await update(studentRef, { nama: newName, email: newEmail });
        console.log("Student updated successfully");

        // Update local state to reflect the changes
        setSiswa((prevSiswa) => prevSiswa.map((student) => (student.uid === uid ? { ...student, nama: newName, email: newEmail } : student)));
      } catch (error) {
        console.error("Error updating student:", error);
      }
    }
  };

  const handleDelete = async (uid) => {
    // Show a confirmation dialog
    const isConfirmed = confirm("Are you sure you want to delete this student?");

    // Proceed with deletion only if confirmed
    if (isConfirmed) {
      const db = getDatabase();
      const studentRef = ref(db, `siswa/${uid}`);
      try {
        await remove(studentRef);
        console.log("Student deleted successfully");

        // Update local state to remove the deleted student
        setSiswa((prevSiswa) => prevSiswa.filter((student) => student.uid !== uid));
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
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((s) => (
            <tr key={s.uid} className="border-b">
              <td className="p-2">{s.nama}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(s.uid)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(s.uid)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
