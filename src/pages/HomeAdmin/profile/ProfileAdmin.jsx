import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import LogoutAdmin from "../Logout/LogoutAdmin";

function ProfileAdmin() {
  const [guruData, setGuruData] = useState({
    name: "Loading...",
    email: "loading@example.com",
    kelas: "Loading...",
    profileImageUrl: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedGuru = JSON.parse(localStorage.getItem("user"));
    if (storedGuru && storedGuru.email) {
      const db = getDatabase();
      const emailKey = storedGuru.email.replace(/[.$#[\]]/g, ",");
      const guruRef = dbRef(db, `admin/${emailKey}`);

      const unsubscribe = onValue(guruRef, async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setGuruData({
            name: data.name || "Nama Tidak Diketahui",
            email: data.email.replace(",", "."),
            kelas: data.kelas || "Kelas Tidak Diketahui",
            profileImageUrl: data.profileImageUrl || null,
          });
        }
      });

      return () => unsubscribe();
    } else {
      navigate("/guru/login"); // Redirect jika tidak ada data guru
    }
  }, [navigate]);

  const handleBackToDashboard = () => {
    navigate("/profile-admin");
  };
  const handleEditProfile = () => {
    navigate("/edit-profile-admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <div className="text-center">
          {guruData.profileImageUrl ? <img src={guruData.profileImageUrl} alt="Foto Profil" className="w-20 h-20 mx-auto rounded-full mb-4 object-cover" /> : <div className="w-20 h-20 mx-auto rounded-full mb-4 bg-gray-200"></div>}
          <h2 className="text-xl font-semibold">{guruData.name}</h2>
          <p className="text-gray-500">Email: {guruData.email}</p>
        </div>
        <div className="mt-6 text-center">
          <button onClick={handleEditProfile} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Edit Profil
          </button>
          <br />
        </div>
        <div className="mt-3 text-center">
          <button onClick={handleBackToDashboard} className="hover:text-red-500 text-indigo-600 hover:underline focus:outline-none">
            <LogoutAdmin />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdmin;
