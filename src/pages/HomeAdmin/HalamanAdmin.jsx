import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link

const HalamanAdmin = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex justify-between max-w-4xl mx-auto">
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="/halaman-admin/panel-admin">Guru</a>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="/halaman-admin/panel-siswa">Siswa</a>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="#profil">Profil</a>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded relative">
          <button onClick={toggleDropdown}>Kelas</button>
          {showDropdown && (
            <ul className="absolute bg-white text-blue-500 mt-1 p-2 rounded shadow-lg">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link to={`/kelas/${kelas}`}>Kelas {kelas}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default HalamanAdmin;
