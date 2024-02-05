import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import AppName from "../../components/AppName/AppName";
import AnimatedButton from "../../components/button/Button";
import NavigationBar from "./Navigate/NavigationBar";

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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <AppName>
          <div className="app-title font-extrabold" style={{ color: "gold" }}>
            HSQOnline
          </div>
          <div className="app-subtitle font-body font-extrabold">
            <span className="">Hayyuk</span> Setor Quran Online
          </div>
        </AppName>
      </div>
      <div className="text-center font-body ">
        <p className="mt-4 text-sm md:text-lg lg:text-lg italic ">Assalamu'alaikum Warahmatullahi Wabarakatuh,</p>
        <p className="text-sm px-3 md:text-lg lg:text-lg ">Selamat datang di Halaman Utama Setoran Hafalan. Kami mengundang Anda untuk menjelajahi beragam fitur yang kami tawarkan, sesuaikan dengan kebutuhan Anda.</p>
      </div>

      <div className="mt-4 flex flex-col space-y-4 font-body">
        <AnimatedButton className="" onClick={() => navigate("/setoran")}>
          Setoran Rekaman
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-6 h-6">
            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
          </svg>
        </AnimatedButton>
        <AnimatedButton className="" onClick={() => navigate("/info-terkini")}>
          Tips Mudah Menghafal
        </AnimatedButton>
        <AnimatedButton className="" onClick={() => navigate("/info-terkini")}>
          Ajukan Setoran Via Online
        </AnimatedButton>
        <AnimatedButton onClick={() => navigate("/hafiz-rank")}>Hafizh Rank</AnimatedButton>
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-white py-3 px-2 shadow-lg">
        <NavigationBar />
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
