import React, { useEffect, useState } from "react";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { Avatar } from "@nextui-org/react";
import UserRatingProfilNav from "../../HomeSiswa/UserRating/UserRatingProfilNav";
import Logout from "../../Login/Logout";

const ProfilNav = () => {
  const [userData, setUserData] = useState({
    displayName: "Loading...",
    email: "loading@example.com",
    profileImageUrl: null,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      const db = getDatabase();
      const emailKey = storedUser.email.replace(/[.$#[\]]/g, ",");
      const userRef = dbRef(db, `siswa/${emailKey}`);

      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData({
            displayName: data.name || "Nama Tidak Diketahui",
            email: data.email.replace(",", "."),
            profileImageUrl: data.profileImageUrl || null,
          });
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <div className="rounded-2xl z-10 fixed top-0 left-0 right-0 shadow-md backdrop-blur-xl m-2 flex items-center justify-between">
      <div className="flex items-center space-x-4 p-2">
        {userData.profileImageUrl ? <Avatar isBordered radius="md" color="primary" src={userData.profileImageUrl} alt="Foto Profil" className="w-10 h-10 object-cover" /> : <div className="w-10 h-10  bg-gray-200"></div>}
        <div className="text-sm">
          <span className="font-medium text-white bg-hijau px-1 rounded-md">{userData.displayName}</span>
          <UserRatingProfilNav userEmail={userData.email} />
        </div>
      </div>
      <div className="p-2 text-blue-500 font-bold active:text-red-500 hover:text-red-500">
        <Logout />
      </div>
    </div>
  );
};

export default ProfilNav;
