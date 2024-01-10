import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, set } from "firebase/database";

function EditProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    kelas: "",
  });
  const navigate = useNavigate();
  const kelasOptions = ["1", "2", "3", "4", "5", "6"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const storedUserData = JSON.parse(storedUser);
      const emailKey = storedUserData.email.replace(/[.$#[\]]/g, ",");
      const db = getDatabase();
      const userRef = ref(db, "siswa/" + emailKey);

      onValue(
        userRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setProfile({
              ...data,
              email: data.email.replace(",", "."),
            });
          }
        },
        {
          onlyOnce: true,
        }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const emailKey = profile.email.replace(/[.$#[\]]/g, ",");
    const userRef = ref(db, "siswa/" + emailKey);

    try {
      await set(userRef, profile);
      localStorage.setItem("userKey", JSON.stringify(profile));
      navigate("/user-profile");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
              Nama:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly // Membuat field email read-only
            />
          </div>
          <div className="mb-4">
            <label htmlFor="kelas" className="block text-gray-700 text-sm font-bold mb-2">
              Kelas:
            </label>
            <select id="kelas" name="kelas" value={profile.kelas} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
              {kelasOptions.map((kelas) => (
                <option key={kelas} value={kelas}>
                  Kelas {kelas}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
