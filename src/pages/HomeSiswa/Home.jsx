import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import AppName from "../../components/AppName/AppName";
import Card from "../../components/button/Card";
import NavigationBar from "./Navigate/NavigationBar";
import confetti from "canvas-confetti";
import record3d from "../../assets/record3d.png";
import news from "../../assets/news.png";
import download from "../../assets/download.png";
import rangking from "../../assets/ranking.png";
import Logo from "../../components/logo/LogoStyled";
import ProfilNav from "./ProfilNav/ProfilNav";
import styled, { keyframes } from "styled-components";
import Footer from "../../components/Footer/footer";

function Home() {
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

  const headShake = keyframes`
  0% { transform: rotate(0deg) skew(0deg, 0deg); }
  25% { transform: rotate(-3deg) skew(-1deg, 0deg); }
  50% { transform: rotate(3deg) skew(1deg, 0deg); }
  75% { transform: rotate(-3deg) skew(-1deg, 0deg); }
  100% { transform: rotate(0deg) skew(0deg, 0deg); }
`;

  const ShakingWord = styled.span`
    display: inline-block;
    animation: ${headShake} 1.5s ease-in-out infinite;
    transform-origin: bottom;
    margin-right: 0.3rem; /* Spasi antar kata */
    animation-delay: ${(props) => props.delay}s;
  `;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfetti = () => {
    confetti({});
  };

  return (
    <div className="mb-24">
      <div className="">
        <ProfilNav />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center -mb-4">
          <AppName>
            <Logo />
            <div className="app-title -mt-10 font-sans font-extrabold" style={{ color: "#042E33" }}>
              <span className="">HSQOnline</span>
            </div>
            <div className="app-subtitle -mt-2 font-andika font-extrabold text-5xl" style={{ color: "#042E33" }}>
              <ShakingWord className="from-green-500 font-extrabold to-blue-500 bg-clip-text p-1 text-transparent bg-gradient-to-r">Hayyuk</ShakingWord> Setor Quran Online
            </div>
          </AppName>
        </div>
        <div className="text-center text-biru font-andika">
          <p className="text-md md:bg-transparent md:text-lg lg:text-lg text-biru bg-kuning italic">السلام عليكم ورحمة الله وبركاته</p>
          <p className="mb-1 text-sm px-3 md:text-lg lg:text-lg">
            Selamat datang di Halaman Utama Setoran Hafalan. Bergabunglah dengan kami dan temukan kemudahan dalam menghafal Al-Qur'an. Mari tingkatkan hafalan Anda dengan semangat dan dedikasi.
          </p>
        </div>

        <div className="mt-4 flex gap-2 font-andika text-biru">
          <div className="gap-2 md:flex-row flex flex-col">
            <Card title="Setoran Rekaman" onClick={() => navigate("/setoran")} icon={record3d} />
            <Card title="Artikel" onClick={() => navigate("/info-terkini")} icon={news} />
          </div>
          <div className="flex md:flex-row flex-col gap-2">
            <Card title="Laporan" onClick={() => navigate("/pdfswitcher")} icon={download} />
            <Card title="Hafizh Ranking" onClick={() => navigate("/hafiz-rank")} icon={rangking} />
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 bg-white py-3 px-2 shadow-lg">
          <NavigationBar />
        </div>
        {showAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-xl font-semibold mb-4">Selamat Datang!</p>
              <p>Terima kasih telah mengunjungi Halaman Utama Setoran Hafalan. Silakan menjelajahi fitur-fitur kami.</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => {
                  setShowAlert(false);
                  handleConfetti();
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="-mt-28">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
