import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardGuru = () => {
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(false);
  const [isRepeatedOpen, setIsRepeatedOpen] = useState(false);

  const dropdownOptions = ["main", "accepted", "repeated"];

  const handleMainClick = () => {
    setIsMainOpen(!isMainOpen);
    setIsAcceptedOpen(false);
    setIsRepeatedOpen(false);
  };

  const handleAcceptedClick = () => {
    setIsMainOpen(false);
    setIsAcceptedOpen(!isAcceptedOpen);
    setIsRepeatedOpen(false);
  };

  const handleRepeatedClick = () => {
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

  const handleDropdownSelection = (selectedItem, dropdownType) => {
    setSelectedDropdown(selectedItem);
    console.log(`${dropdownType} Dropdown:`, selectedItem);
    closeAllDropdowns();
  };

  // Get the current location
  const location = useLocation();

  return (
    <nav className="bg-blue-500 text-white text-lg p-2 sticky top-0">
      <ul className="flex flex-col sm:flex-row justify-between max-w-4xl mx-auto">
        <li className={`relative p-2 hover:bg-blue-600 ${location.pathname.includes("/setoran/guru") ? "bg-yellow-500" : ""}`}>
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
        <li className={`relative p-2 hover:bg-blue-600 ${location.pathname.includes("/setoran/diterima") ? "bg-yellow-500" : ""}`}>
          <button onClick={handleAcceptedClick}>{`Setoran Diterima`}</button>
          {isAcceptedOpen && (
            <ul className="bg-white text-blue-500 p-2 rounded shadow-lg absolute left-0 mt-2 z-10">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link to={`/setoran/diterima/${kelas}`} onClick={() => handleDropdownSelection(`accepted-${kelas}`, "Accepted")}>
                    Kelas {kelas}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className={`relative p-2 hover:bg-blue-600 ${location.pathname.includes("/setoran/diulangi") ? "bg-yellow-500" : ""}`}>
          <button onClick={handleRepeatedClick}>{`Setoran Diulangi`}</button>
          {isRepeatedOpen && (
            <ul className="bg-white text-blue-500 p-2 rounded shadow-lg absolute left-0 mt-2 z-10">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link to={`/setoran/diulangi/${kelas}`} onClick={() => handleDropdownSelection(`repeated-${kelas}`, "Repeated")}>
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
