import React, { useState, useEffect } from "react";
import { ref, get, getDatabase, update, remove } from "firebase/database";

const PanelSiswa = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const db = getDatabase();
      const studentsRef = ref(db, "siswa");
      try {
        const snapshot = await get(studentsRef);
        if (snapshot.exists()) {
          const studentsData = snapshot.val();
          const studentsArray = Object.entries(studentsData).map(([key, value]) => ({ uid: key, ...value }));
          setStudents(studentsArray);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleUpdate = async (uid) => {
    // Retrieve the current data of the student
    const currentStudent = students.find((student) => student.uid === uid);
    if (!currentStudent) {
      alert("Student not found");
      return;
    }

    // Prompt the admin to enter new values
    let newName = prompt("Enter new name:", currentStudent.nama);
    let newEmail = prompt("Enter new email:", currentStudent.email);
    let newClass = prompt("Enter new class:", currentStudent.kelas);

    // Check if the admin actually entered some data
    if (newName !== null && newEmail !== null && newClass !== null) {
      const db = getDatabase();
      const studentRef = ref(db, `siswa/${uid}`);

      try {
        await update(studentRef, { nama: newName, email: newEmail, kelas: newClass });
        console.log("Student updated successfully");

        // Update local state to reflect the changes
        setStudents((prevStudents) => prevStudents.map((student) => (student.uid === uid ? { ...student, nama: newName, email: newEmail, kelas: newClass } : student)));
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
        setStudents((prevStudents) => prevStudents.filter((student) => student.uid !== uid));
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">Halaman Siswa</h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
            <th className="p-2">Kelas</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.uid} className="border-b">
              <td className="p-2">{student.nama}</td>
              <td className="p-2">{student.email}</td>
              <td className="p-2">{student.kelas}</td>
              <td className="p-2">
                <button onClick={() => handleUpdate(student.uid)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(student.uid)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelSiswa;
