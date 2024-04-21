import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation

const HalamanAdmin = () => {
  const [showKelasDropdown, setShowKelasDropdown] = useState(false);
  const [showSetoranDropdown, setShowSetoranDropdown] = useState(false);
  const [showLainnyaDropdown, setShowLainnyaDropdown] = useState(false);

  const location = useLocation(); // Dapatkan lokasi saat ini dari react-router

  useEffect(() => {
    // Fungsi ini akan dijalankan setiap kali URL berubah
    // Menutup dropdown jika URL berubah
    setShowKelasDropdown(false);
    setShowSetoranDropdown(false);
    setShowLainnyaDropdown(false);
  }, [location.pathname]); // Memantau perubahan pathname dari URL

  const toggleKelasDropdown = () => {
    setShowKelasDropdown(!showKelasDropdown);
    setShowSetoranDropdown(false); // Tutup dropdown Setoran jika terbuka
    setShowLainnyaDropdown(false); // Tutup dropdown Lainnya jika terbuka
  };

  const toggleSetoranDropdown = () => {
    setShowSetoranDropdown(!showSetoranDropdown);
    setShowKelasDropdown(false); // Tutup dropdown Kelas jika terbuka
    setShowLainnyaDropdown(false); // Tutup dropdown Lainnya jika terbuka
  };

  const toggleLainnyaDropdown = () => {
    setShowLainnyaDropdown(!showLainnyaDropdown);
    setShowKelasDropdown(false); // Tutup dropdown Kelas jika terbuka
    setShowSetoranDropdown(false); // Tutup dropdown Setoran jika terbuka
  };

  return (
    <nav className="bg-blue-500 text-white text-lg p-2">
      <ul className="flex flex-col sm:flex-row justify-between max-w-4xl mx-auto">
        <li className="relative p-2 hover:bg-blue-700">
          <a href="/dataguru" className="flex items-center">
            <span>Guru</span>
          </a>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded relative">
          <button onClick={toggleKelasDropdown} className="flex items-center">
            <span>Kelas</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
              <path
                fillRule="evenodd"
                d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
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
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded relative">
          <button onClick={toggleSetoranDropdown} className="flex items-center">
            <span>Setoran</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
              <path
                fillRule="evenodd"
                d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
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
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded relative">
          <button onClick={toggleLainnyaDropdown} className="flex items-center">
            <span>Lainnya</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
              <path
                fillRule="evenodd"
                d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showLainnyaDropdown && (
            <ul className="absolute bg-white text-blue-500 mt-1 p-2 rounded shadow-lg">
              <li className="hover:bg-blue-100 p-2">
                <Link to="/berita-admin">Buat Berita</Link>
              </li>
              <li className="hover:bg-blue-100 p-2">
                <Link to="/edit">Daftar Berita</Link>
              </li>
              <li className="hover:bg-blue-100 p-2">
                <Link to="/persetujuan-siswa">Persetujuan Siswa</Link>
              </li>
              <li className="hover:bg-blue-100 p-2">
                <Link to="/persetujuan-guru">Persetujuan Guru</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="/profile-admin">Profil</a>
        </li>
      </ul>
    </nav>
  );
};

export default HalamanAdmin;
