import React, { useState, useEffect } from "react";
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
    // Retrieve the current data of the teacher
    const currentTeacher = teachers.find((teacher) => teacher.uid === uid);
    if (!currentTeacher) {
      alert("Teacher not found");
      return;
    }

    // Prompt the admin to enter new values
    let newName = prompt("Enter new name:", currentTeacher.name);
    let newEmail = prompt("Enter new email:", currentTeacher.email);

    // Check if the admin actually entered some data
    if (newName !== null && newEmail !== null) {
      const db = getDatabase();
      const teacherRef = ref(db, `guru/${uid}`);

      try {
        await update(teacherRef, { name: newName, email: newEmail });
        console.log("Teacher updated successfully");

        // Update local state to reflect the changes
        setTeachers((prevTeachers) => prevTeachers.map((teacher) => (teacher.uid === uid ? { ...teacher, name: newName, email: newEmail } : teacher)));
      } catch (error) {
        console.error("Error updating teacher:", error);
      }
    }
  };

  const handleDelete = async (uid) => {
    // Show a confirmation dialog
    const isConfirmed = confirm("Are you sure you want to delete this teacher?");

    // Proceed with deletion only if confirmed
    if (isConfirmed) {
      const db = getDatabase();
      const teacherRef = ref(db, `guru/${uid}`);
      try {
        await remove(teacherRef);
        console.log("Teacher deleted successfully");

        // Update local state to remove the deleted teacher
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.uid !== uid));
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">Halaman Guru</h1>
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
