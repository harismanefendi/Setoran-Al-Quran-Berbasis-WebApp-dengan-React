import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardGuru = () => {
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(false);
  const [isRepeatedOpen, setIsRepeatedOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMainClick = () => {
    console.log("Main Dropdown clicked");
    setIsMainOpen(!isMainOpen);
    setIsAcceptedOpen(false);
    setIsRepeatedOpen(false);
  };

  const handleAcceptedClick = () => {
    console.log("Accepted Dropdown clicked");
    setIsMainOpen(false);
    setIsAcceptedOpen(!isAcceptedOpen);
    setIsRepeatedOpen(false);
  };

  const handleRepeatedClick = () => {
    console.log("Repeated Dropdown clicked");
    setIsMainOpen(false);
    setIsAcceptedOpen(false);
    setIsRepeatedOpen(!isRepeatedOpen);
  };

  const closeAllDropdowns = () => {
    setIsMainOpen(false);
    setIsAcceptedOpen(false);
    setIsRepeatedOpen(false);
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
        <li ref={dropdownRef} className={`border-2 border-spacing-2 bg-green-700 rounded-lg relative p-2 hover:bg-green-800 ${location.pathname.includes("/setoran/guru") ? "bg-blue-600" : ""}`}>
          <button onClick={handleMainClick}>{`Setoran Masuk`}</button>
          {isMainOpen && (
            <ul className="bg-white text-blue-500 p-2 rounded shadow-lg absolute left-0 mt-2 z-10">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link to={`/setoran/guru/${kelas}`} onClick={() => handleDropdownSelection(`main-${kelas}`, "Main")}>
                    Kelas {kelas}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className={`relative p-2 hover:bg-blue-600 ${location.pathname.includes("/setoran/diterima") ? "bg-blue-600" : ""}`}>
          <button onClick={handleAcceptedClick}>{`Setoran Diterima`}</button>
          {isAcceptedOpen && (
            <ul className="bg-white text-blue-500 p-2 rounded shadow-lg absolute left-0 mt-2 z-10">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link
                    to={`/setoran/diterima/${kelas}`} // Pastikan ini sesuai dengan rute yang ingin Anda tuju
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
        <li className={`relative p-2 hover:bg-blue-600 ${location.pathname.includes("/setoran/diulangi") ? "bg-blue-600" : ""}`}>
          <button onClick={handleRepeatedClick}>{`Setoran Diulangi`}</button>
          {isRepeatedOpen && (
            <ul className="bg-white text-blue-500 p-2 rounded shadow-lg absolute left-0 mt-2 z-10">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link
                    to={`/setoran/diulangi/${kelas}`} // Pastikan ini sesuai dengan rute yang ingin Anda tuju
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
        <li className="p-2">
          <Link to="/profile-guru" onClick={closeAllDropdowns}>
            Profil
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardGuru;
