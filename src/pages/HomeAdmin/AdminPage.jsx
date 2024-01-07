import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import { ref, get, getDatabase, update, remove } from "firebase/database";

const AdminPage = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const db = getDatabase();
      const teachersRef = ref(db, "guru");
      try {
        const snapshot = await get(teachersRef);
        if (snapshot.exists()) {
          const teachersData = snapshot.val();
          const teachersArray = Object.entries(teachersData).map(([key, value]) => ({ uid: key, ...value }));
          setTeachers(teachersArray);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleUpdate = async (uid) => {
    const currentTeacher = teachers.find((teacher) => teacher.uid === uid);
    if (!currentTeacher) {
      alert("Teacher not found");
      return;
    }

    let newName = prompt("Enter new name:", currentTeacher.name);
    let newEmail = prompt("Enter new email:", currentTeacher.email);

    if (newName !== null && newEmail !== null) {
      const db = getDatabase();
      const teacherRef = ref(db, `guru/${uid}`);

      try {
        await update(teacherRef, { name: newName, email: newEmail });
        console.log("Teacher updated successfully");
        setTeachers((prevTeachers) => prevTeachers.map((teacher) => (teacher.uid === uid ? { ...teacher, name: newName, email: newEmail } : teacher)));
      } catch (error) {
        console.error("Error updating teacher:", error);
      }
    }
  };

  const handleDelete = async (uid) => {
    const isConfirmed = confirm("Are you sure you want to delete this teacher?");

    if (isConfirmed) {
      const db = getDatabase();
      const teacherRef = ref(db, `guru/${uid}`);
      try {
        await remove(teacherRef);
        console.log("Teacher deleted successfully");
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.uid !== uid));
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.text("Daftar Guru", 10, 10);
    doc.autoTable({
      startY: 20,
      head: [["Nama", "Email"]],
      body: teachers.map((teacher) => [teacher.name, teacher.email]),
    });

    doc.text("Tanda Tangan:", 10, doc.lastAutoTable.finalY + 10);
    doc.save("daftar_guru.pdf");
  };

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">Halaman Guru</h1>
      <button onClick={downloadPdf} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4">
        Download PDF
      </button>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.uid} className="border-b">
              <td className="p-2">{teacher.name}</td>
              <td className="p-2">{teacher.email}</td>
              <td className="p-2">
                <button onClick={() => handleUpdate(teacher.uid)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(teacher.uid)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
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

export default AdminPage;
