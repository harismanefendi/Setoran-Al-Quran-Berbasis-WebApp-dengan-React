import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link

const HalamanAdmin = () => {
  const [showKelasDropdown, setShowKelasDropdown] = useState(false);
  const [showSetoranDropdown, setShowSetoranDropdown] = useState(false);

  const toggleKelasDropdown = () => {
    setShowKelasDropdown(!showKelasDropdown);
    setShowSetoranDropdown(false); // Tutup dropdown Setoran jika terbuka
  };

  const toggleSetoranDropdown = () => {
    setShowSetoranDropdown(!showSetoranDropdown);
    setShowKelasDropdown(false); // Tutup dropdown Kelas jika terbuka
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex justify-between max-w-4xl mx-auto">
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="/halaman-admin/panel-admin">Guru</a>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <button onClick={toggleKelasDropdown}>Kelas</button>
          {showKelasDropdown && (
            <ul className="absolute bg-white text-blue-500 mt-1 p-2 rounded shadow-lg">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link to={`/kelas/${kelas}`}>Kelas {kelas}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        {/* <a href="/halaman-admin/panel-siswa">Siswa</a> */}
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <button onClick={toggleSetoranDropdown}>Setoran</button>
          {showSetoranDropdown && (
            <ul className="absolute bg-white text-blue-500 mt-1 p-2 rounded shadow-lg">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link to={`/setoran/${kelas}`}>Kelas {kelas}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="#profil">Profil</a>
        </li>
      </ul>
    </nav>
  );
};

export default HalamanAdmin;
