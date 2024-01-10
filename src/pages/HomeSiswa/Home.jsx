import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

function Home() {
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mt-4 text-center">
        <h1 className="text-blue-800 font-bold text-4xl md:text-6xl relative">
          <span className="absolute top-0 left-0 -z-1 text-red-800">
            HSQOnline <br /> Hayyuk Setor Quran Online
          </span>
          <span className="text-blue-400">
            <span className="arabic-text">HSQOnline</span> <br /> <span className="arabic-text">Hayyuk Setor Quran Online</span>
          </span>
        </h1>
      </div>

      <p className="mt-4 text-base md:text-2xl lg:text-3xl text-center">Assalamu'alaikum Warahmatullahi Wabarakatuh,</p>
      <p className="text-lg font-semibold text-center">Selamat datang di Halaman Utama Setoran Hafalan.</p>
      <p className="text-lg font-semibold text-center">Kami mengundang Anda untuk menjelajahi beragam fitur yang kami tawarkan, sesuaikan dengan kebutuhan Anda.</p>
      <div className="mt-4 flex flex-col space-y-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300" onClick={() => navigate("/setoran")}>
          Setoran Rekaman Hafalan
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300">Tips Mudah Menghafal</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300">Ajukan Setoran Via Online</button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300">Tombol 4</button>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 py-4">
        <div className="container mx-auto flex justify-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300" onClick={() => navigate("/feedback-siswa", { state: { userEmail: "email_siswa_di_sini" } })}>
            Feedback
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
            onClick={() => navigate("/halaman-diterima", { state: { userEmail: "email_siswa_di_sini" } })}
          >
            Diterima
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300" onClick={() => navigate("/halaman-diulangi", { state: { userEmail: "email_siswa_di_sini" } })}>
            Diulangi
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300" onClick={() => navigate("/user-profile")}>
            Profil
          </button>
        </div>
      </div>
      {showAlert && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="animate-slide-in bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl font-semibold mb-4">Selamat Datang!</p>
            <p>Terima kasih telah mengunjungi Halaman Utama Setoran Hafalan. Silakan menjelajahi fitur-fitur kami.</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setShowAlert(false)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
