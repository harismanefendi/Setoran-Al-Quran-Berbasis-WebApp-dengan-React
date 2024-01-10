import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage"; // Menggunakan alias storageRef untuk Firebase Storage

function UserProfile() {
  const [userData, setUserData] = useState({
    displayName: "Loading...",
    email: "loading@example.com",
    kelas: "Loading...",
    profileImageUrl: null, // Menambahkan field profileImageUrl
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      const db = getDatabase();
      const emailKey = storedUser.email.replace(/[.$#[\]]/g, ",");
      const userRef = dbRef(db, `siswa/${emailKey}`);

      const unsubscribe = onValue(userRef, async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData({
            displayName: data.name || "Nama Tidak Diketahui",
            email: data.email.replace(",", "."),
            kelas: data.kelas || "Kelas Tidak Diketahui",
            profileImageUrl: data.profileImageUrl || null, // Mengambil URL gambar profil
          });
        }
      });

      return () => unsubscribe();
    } else {
      navigate("/home/login"); // Redirect jika tidak ada data pengguna
    }
  }, [navigate]);

  const handleBackToHome = () => {
    navigate("/home/login"); // Ganti dengan path ke halaman Home Anda
  };
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <div className="text-center">
          {userData.profileImageUrl ? <img src={userData.profileImageUrl} alt="Foto Profil" className="w-20 h-20 mx-auto rounded-full mb-4" /> : <div className="w-20 h-20 mx-auto rounded-full mb-4 bg-gray-200"></div>}
          <h2 className="text-xl font-semibold">{userData.displayName}</h2>
          <p className="text-gray-500">Email: {userData.email}</p>
          <p className="text-gray-500">Kelas: {userData.kelas}</p>
        </div>
        <div className="mt-6 text-center">
          <button onClick={handleEditProfile} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Edit Profil
          </button>
        </div>
        <div className="mt-3 text-center">
          <button onClick={handleBackToHome} className="text-indigo-600 hover:underline focus:outline-none">
            Kembali ke Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
