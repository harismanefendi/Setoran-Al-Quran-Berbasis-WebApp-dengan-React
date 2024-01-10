import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation

const HalamanAdmin = () => {
  const [showKelasDropdown, setShowKelasDropdown] = useState(false);
  const [showSetoranDropdown, setShowSetoranDropdown] = useState(false);

  const location = useLocation(); // Dapatkan lokasi saat ini dari react-router

  useEffect(() => {
    // Fungsi ini akan dijalankan setiap kali URL berubah
    // Menutup dropdown jika URL berubah
    setShowKelasDropdown(false);
    setShowSetoranDropdown(false);
  }, [location.pathname]); // Memantau perubahan pathname dari URL

  const toggleKelasDropdown = () => {
    setShowKelasDropdown(!showKelasDropdown);
    setShowSetoranDropdown(false); // Tutup dropdown Setoran jika terbuka
  };

  const toggleSetoranDropdown = () => {
    setShowSetoranDropdown(!showSetoranDropdown);
    setShowKelasDropdown(false); // Tutup dropdown Kelas jika terbuka
  };

  return (
    <nav className="bg-blue-500 text-white text-lg p-2">
      <ul className="flex flex-col sm:flex-row justify-between max-w-4xl mx-auto">
        <li className="relative p-2 hover:bg-blue-600">
          <a href="/dataguru">Guru</a>
        </li>
        <li className="hover-bg-blue-700 transition-colors duration-300 p-2 rounded">
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
        <li className="hover-bg-blue-700 transition-colors duration-300 p-2 rounded">
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
