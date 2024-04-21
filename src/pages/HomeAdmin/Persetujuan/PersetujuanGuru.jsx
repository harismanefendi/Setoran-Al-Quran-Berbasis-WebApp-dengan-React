import { useState, useEffect } from "react";
import { ref, get, getDatabase, update, remove } from "firebase/database";
import { auth } from "../../../config/firebase"; // Import auth dari Firebase

const ApprovalPage = () => {
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

  const handleApproval = async (uid) => {
    const currentTeacher = teachers.find((teacher) => teacher.uid === uid);
    if (!currentTeacher) {
      alert("Teacher not found");
      return;
    }

    const db = getDatabase();
    const teacherRef = ref(db, `guru/${uid}`);

    try {
      await update(teacherRef, { registrationPending: false, approved: true });
      console.log("Teacher approved successfully");
      setTeachers((prevTeachers) => prevTeachers.map((teacher) => (teacher.uid === uid ? { ...teacher, registrationPending: false, approved: true } : teacher)));
    } catch (error) {
      console.error("Error approving teacher:", error);
    }
  };

  const handleRejection = async (uid, email) => {
    const isConfirmed = window.confirm("Are you sure you want to reject this teacher's registration?");

    if (isConfirmed) {
      const db = getDatabase();
      const teacherRef = ref(db, `guru/${uid}`);
      try {
        await remove(teacherRef);
        console.log("Teacher registration rejected successfully");
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.uid !== uid));

        // Hapus akun guru dari autentikasi Firebase saat ditolak oleh admin
        try {
          const user = await auth.getUserByEmail(email); // Gunakan email guru yang ditolak untuk mencari akun pengguna di Firebase Authentication
          await auth.deleteUser(user.uid);
          console.log("User deleted from Firebase authentication.");
        } catch (error) {
          console.error("Error deleting user from Firebase authentication:", error);
          // Handle error here
        }
      } catch (error) {
        console.error("Error rejecting teacher registration:", error);
        // Handle error here
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-lg p-4 overflow-x-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Persetujuan Registrasi Guru</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 w-1/3 md:w-auto">Nama</th>
              <th className="p-2 w-1/3 md:w-auto">Email</th>
              <th className="p-2 w-1/3 md:w-auto">Persetujuan</th>
              <th className="p-2 w-1/3 md:w-auto">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.uid} className="border-b">
                <td className="p-2">{teacher.name}</td>
                <td className="p-2">{teacher.email}</td>
                <td className="p-2">{teacher.registrationPending ? "Menunggu Persetujuan" : "Disetujui"}</td>
                <td className="p-2">
                  {teacher.registrationPending && (
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                      <button onClick={() => handleApproval(teacher.uid)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 text-sm rounded">
                        Setujui
                      </button>
                      <button onClick={() => handleRejection(teacher.uid)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 text-sm rounded">
                        Tolak
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalPage;
