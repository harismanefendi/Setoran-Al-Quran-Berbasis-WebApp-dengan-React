import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardGuru = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex justify-between max-w-4xl mx-auto">
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded relative">
          <button onClick={toggleDropdown}>Setoran</button>
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
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <Link to="/teacher">Setoran Diterima</Link>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <Link to="/student">Setoran Diulangi</Link>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <Link to="/profile">Profil</Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardGuru;
