import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="max-w-md mx-auto flex justify-between items-center px-4 space-x-2">
      <button
        className={`flex flex-col items-center text-xs text-gray-700 hover:text-hijaukalam transition-colors ${location.pathname === "/home/login" ? "text-hijaukalam" : ""}`}
        onClick={() => navigate("/home/login", { state: { userEmail: "email_siswa_di_sini" } })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l-7-7 2-2h10l2 2-7 7z" />
        </svg>
        Home
      </button>
      <button
        className={`flex flex-col items-center text-xs text-gray-700 hover:text-hijaukalam transition-colors ${location.pathname === "/feedback-siswa" ? "text-hijaukalam" : ""}`}
        onClick={() => navigate("/feedback-siswa", { state: { userEmail: "email_siswa_di_sini" } })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Feedback
      </button>
      <button
        className={`flex flex-col items-center text-xs text-gray-700 hover:text-hijaukalam transition-colors ${location.pathname === "/halaman-diterima" ? "text-hijaukalam" : ""}`}
        onClick={() => navigate("/halaman-diterima", { state: { userEmail: "email_siswa_di_sini" } })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Diterima
      </button>
      <button
        className={`flex flex-col items-center text-xs text-gray-700 hover:text-hijaukalam transition-colors ${location.pathname === "/halaman-diulangi" ? "text-hijaukalam" : ""}`}
        onClick={() => navigate("/halaman-diulangi", { state: { userEmail: "email_siswa_di_sini" } })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l-2 2-2-2v13h10V6l-2 2-2-2v13z" />
        </svg>
        Diulangi
      </button>
      <button className="flex flex-col items-center text-xs text-gray-700 hover:text-hijaukalam transition-colors" onClick={() => navigate("/user-profile")}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        Profil
      </button>
    </div>
  );
}

export default NavigationBar;
