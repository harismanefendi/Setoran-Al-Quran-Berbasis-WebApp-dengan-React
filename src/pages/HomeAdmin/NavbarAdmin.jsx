import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarAdmin = () => {
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(false);
  const [isRepeatedOpen, setIsRepeatedOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // State untuk dropdown riwayat
  const dropdownRef = useRef(null);

  const handleMainClick = () => {
    console.log("Main Dropdown clicked");
    setIsMainOpen(!isMainOpen);
    setIsAcceptedOpen(false);
    setIsRepeatedOpen(false);
    setIsHistoryOpen(false); // Tutup dropdown riwayat saat dropdown lainnya dibuka
  };

  const handleAcceptedClick = () => {
    console.log("Accepted Dropdown clicked");
    setIsMainOpen(false);
    setIsAcceptedOpen(!isAcceptedOpen);
    setIsRepeatedOpen(false);
    setIsHistoryOpen(false); // Tutup dropdown riwayat saat dropdown lainnya dibuka
  };

  const handleRepeatedClick = () => {
    console.log("Repeated Dropdown clicked");
    setIsMainOpen(false);
    setIsAcceptedOpen(false);
    setIsRepeatedOpen(!isRepeatedOpen);
    setIsHistoryOpen(false); // Tutup dropdown riwayat saat dropdown lainnya dibuka
  };

  const handleHistoryClick = () => {
    console.log("History Dropdown clicked");
    setIsMainOpen(false);
    setIsAcceptedOpen(false);
    setIsRepeatedOpen(false);
    setIsHistoryOpen(!isHistoryOpen);
  };

  const closeAllDropdowns = () => {
    setIsMainOpen(false);
    setIsAcceptedOpen(false);
    setIsRepeatedOpen(false);
    setIsHistoryOpen(false);
    setSelectedDropdown(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // Tambahkan pengecualian untuk tombol yang membuka dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.tagName !== "BUTTON" &&
        !event.target.classList.contains("dropdown-link") // Tambahkan pengecualian untuk link di dalam dropdown
      ) {
        closeAllDropdowns();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDropdownSelection = (selectedItem, dropdownType) => {
    setSelectedDropdown(selectedItem);
    console.log(`${dropdownType} Dropdown:`, selectedItem);
    closeAllDropdowns();
  };

  // Get the current location
  const location = useLocation();

  return (
    <nav className="text-white z-50 text-base p-2 sticky top-0 bg-gradient-to-r from-green-500 to-blue-500">
      <ul className="flex flex-col sm:flex-row justify-between max-w-4xl mx-auto">
        <li className={`relative p-2 hover:bg-blue-600 rounded-lg ${location.pathname.includes("/data-guru") ? "bg-blue-600" : ""}`}>
          <Link to="/dataguru" onClick={closeAllDropdowns}>
            Guru
          </Link>
        </li>

        <li className={`relative pl-2 pr-3 py-2 hover:bg-blue-600 rounded-lg ${location.pathname.includes("/kelas") ? "bg-blue-600" : ""}`}>
          <button className="flex items-center justify-between" onClick={handleAcceptedClick}>
            <span>Siswa</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isAcceptedOpen && (
            <ul className="bg-white text-blue-500 rounded-lg p-2 shadow-lg absolute left-0 mt-2 z-10">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link
                    to={`/kelas/${kelas}`} // Pastikan ini sesuai dengan rute yang ingin Anda tuju
                    onClick={() => handleDropdownSelection(`accepted-${kelas}`, "Accepted")}
                    className="dropdown-link"
                  >
                    Kelas {kelas}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li className={`relative py-2 pr-4 pl-2 rounded-lg hover:bg-blue-600 ${location.pathname.includes("/setoran") ? "bg-blue-600" : ""}`}>
          <button onClick={handleRepeatedClick}>{`Setoran`}</button>
          {isRepeatedOpen && (
            <ul className="bg-white text-blue-500 rounded-lg shadow-lg absolute left-0 mt-2 z-10">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link
                    to={`/setoran/${kelas}`} // Pastikan ini sesuai dengan rute yang ingin Anda tuju
                    onClick={() => handleDropdownSelection(`repeated-${kelas}`, "Repeated")}
                    className="dropdown-link"
                  >
                    Kelas {kelas}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        {/* Tambahkan button untuk dropdown riwayat */}
        <li className={`relative p-2 rounded-lg hover:bg-blue-600 ${location.pathname.includes("/riwayat") ? "bg-blue-600" : ""}`}>
          <button onClick={handleHistoryClick}>{`Lainnya`}</button>
          {isHistoryOpen && (
            <ul className="bg-white text-blue-500 p-2 rounded shadow-lg absolute left-0 mt-2 z-10">
              <li className="hover:bg-blue-100 p-2">
                <Link
                  to="/berita-admin"
                  // Sesuaikan dengan rute riwayat yang diinginkan
                  onClick={() => handleDropdownSelection("History")}
                  className="dropdown-link"
                >
                  Buat Berita
                </Link>
              </li>
              <li className="hover:bg-blue-100 p-2">
                <Link
                  to={`/edit`} // Sesuaikan dengan rute riwayat yang diinginkan
                  onClick={() => handleDropdownSelection()}
                  className="dropdown-link"
                >
                  Daftar Berita
                </Link>
              </li>
              <li className="hover:bg-blue-100 p-2">
                <Link
                  to={`/persetujuan-guru`} // Sesuaikan dengan rute riwayat yang diinginkan
                  onClick={() => handleDropdownSelection()}
                  className="dropdown-link"
                >
                  Persetujuan Guru
                </Link>
              </li>
              <li className="hover:bg-blue-100 p-2">
                <Link
                  to={`/persetujuan-siswa`} // Sesuaikan dengan rute riwayat yang diinginkan
                  onClick={() => handleDropdownSelection()}
                  className="dropdown-link"
                >
                  Persetujuan Siswa
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`relative p-2 rounded-lg hover:bg-blue-600 ${location.pathname.includes("/profile-admin") ? "bg-blue-600" : ""}`}>
          <Link to="/profile-admin" onClick={closeAllDropdowns}>
            Profil
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
