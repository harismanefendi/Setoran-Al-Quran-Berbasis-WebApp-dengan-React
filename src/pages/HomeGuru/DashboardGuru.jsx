import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardGuru = () => {
  const [showMainDropdown, setShowMainDropdown] = useState(false);
  const [showAcceptedDropdown, setShowAcceptedDropdown] = useState(false);
  const [showRepeatedDropdown, setShowRepeatedDropdown] = useState(false);

  const toggleMainDropdown = () => {
    setShowMainDropdown(!showMainDropdown);
    // Close other dropdowns
    setShowAcceptedDropdown(false);
    setShowRepeatedDropdown(false);
  };

  const toggleAcceptedDropdown = (e) => {
    e.stopPropagation(); // Prevents click event from bubbling up to parent elements
    setShowAcceptedDropdown(!showAcceptedDropdown);
  };

  const toggleRepeatedDropdown = (e) => {
    e.stopPropagation(); // Prevents click event from bubbling up to parent elements
    setShowRepeatedDropdown(!showRepeatedDropdown);
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex justify-between max-w-4xl mx-auto">
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded relative">
          <button onClick={toggleMainDropdown}>Setoran</button>
          {showMainDropdown && (
            <ul className="absolute bg-white text-blue-500 mt-1 p-2 rounded shadow-lg">
              {[1, 2, 3, 4, 5, 6].map((kelas) => (
                <li key={kelas} className="hover:bg-blue-100 p-2">
                  <Link to={`/setoran/kelas/${kelas}`}>Kelas {kelas}</Link>
                </li>
              ))}
              <li className="hover:bg-blue-100 p-2 relative">
                <button onClick={toggleAcceptedDropdown}>Setoran Diterima</button>
                {showAcceptedDropdown && (
                  <ul className="absolute bg-white text-blue-500 mt-1 p-2 rounded shadow-lg left-full top-0">
                    {[1, 2, 3, 4, 5, 6].map((kelas) => (
                      <li key={kelas} className="hover:bg-blue-100 p-2">
                        <Link to={`/setoran/diterima/kelas/${kelas}`}>Kelas {kelas}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="hover:bg-blue-100 p-2 relative">
                <button onClick={toggleRepeatedDropdown}>Setoran Diulangi</button>
                {showRepeatedDropdown && (
                  <ul className="absolute bg-white text-blue-500 mt-1 p-2 rounded shadow-lg left-full top-0">
                    {[1, 2, 3, 4, 5, 6].map((kelas) => (
                      <li key={kelas} className="hover:bg-blue-100 p-2">
                        <Link to={`/setoran/diulangi/kelas/${kelas}`}>Kelas {kelas}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <Link to="/profile">Profil</Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardGuru;
