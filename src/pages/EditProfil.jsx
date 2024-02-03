import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref as dbRef, onValue, set as dbSet } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

function EditProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    kelas: "",
    profileImage: null,
    profileImageUrl: "",
  });

  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [previousProfileImageUrl, setPreviousProfileImageUrl] = useState("");
  const navigate = useNavigate();
  const kelasOptions = ["1", "2", "3", "4", "5", "6"];

  useEffect(() => {
    // Memuat data profil dari database saat komponen dimount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const storedUserData = JSON.parse(storedUser);
      const emailKey = storedUserData.email.replace(/[.$#[\]]/g, ",");
      const db = getDatabase();
      const userRef = dbRef(db, "siswa/" + emailKey);

      onValue(
        userRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setProfile({
              ...data,
              email: data.email.replace(",", "."),
            });
            setPreviousProfileImageUrl(data.profileImageUrl || "");
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoadingImage(true);

      const storage = getStorage();
      const storageReference = storageRef(storage, `profile_images/${profile.email}/${file.name}`);
      try {
        if (previousProfileImageUrl) {
          const previousImageRef = storageRef(storage, previousProfileImageUrl);
          await deleteObject(previousImageRef);
        }

        await uploadBytes(storageReference, file);
        const downloadURL = await getDownloadURL(storageReference);
        setProfile((prevState) => ({
          ...prevState,
          profileImageUrl: downloadURL,
        }));
        setPreviousProfileImageUrl(downloadURL);
      } catch (error) {
        console.error("Error uploading profile image:", error);
      } finally {
        setIsLoadingImage(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getDatabase();
    const emailKey = profile.email.replace(/[.$#[\]]/g, ",");
    const userRef = dbRef(db, "siswa/" + emailKey);

    try {
      await dbSet(userRef, profile); // Menggunakan dbSet untuk menulis data ke database
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
            <label htmlFor="profileImage" className="block text-gray-700 text-sm font-bold mb-2">
              Foto Profil:
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageUpload}
              capture="user" // Mengizinkan pengguna memilih resolusi
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {isLoadingImage && (
            <div className="mb-4">
              <p>Mengunggah gambar...</p>
            </div>
          )}
          {profile.profileImageUrl && (
            <div className="mb-4">
              <img src={profile.profileImageUrl} alt="Profile" className="max-w-full h-auto" />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
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
            <input type="email" id="email" name="email" value={profile.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly />
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
