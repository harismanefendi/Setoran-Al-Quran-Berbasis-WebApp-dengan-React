import { Link } from "react-router-dom";
import "../../style.css";
import Logo from "../../components/logo/LogoStyled";
import AppName from "../../components/AppName/AppName";
const HomePage = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: "url('url-ke-svg-anda.svg') center/cover no-repeat", // Ganti 'url-ke-svg-anda.svg' dengan URL SVG latar belakang Anda
      }}
    >
      <div className="space-y-4 ">
        {" "}
        <div className=" flex justify-center">
          <AppName>
            <Logo />
            <div className="app-title -mt-10 font-sans font-extrabold" style={{ color: "#042E33" }}>
              <span className="">HSQOnline</span>
            </div>
            <div className="app-subtitle -mt-2 font-andika font-extrabold text-5xl" style={{ color: "#042E33" }}>
              <span className="">Hayyuk</span> Setor Quran Online
            </div>
          </AppName>
        </div>
        <div className="items-center  flex flex-col space-y-4">
          <h1 className="text-3xl flex items-center font-bold mb-6 text-pretty text-biru">Selamat Datang!</h1>
          <Link to="/admin">
            <button className="relative group bg-gradient-to-b from-green-500 to-green-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-7 rounded-full transition-transform transform hover:scale-105 shadow-2xl">
              <span className="absolute inset-0 bg-opacity-50 bg-white rounded-full transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Admin
            </button>
          </Link>
          <Link to="/guru">
            <button className="relative group bg-gradient-to-b from-green-500 to-hijaupakek hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-9 rounded-full transition-transform transform hover:scale-105 shadow-2xl">
              <span className="absolute inset-0 bg-opacity-50 bg-white rounded-full transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Guru
            </button>
          </Link>
          <Link to="/siswa">
            <button className="relative px-8 group bg-gradient-to-b from-green-500 to-green-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-2  rounded-full transition-transform transform hover:scale-105 shadow-2xl">
              <span className="absolute inset-0 bg-opacity-50 bg-white rounded-full transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Siswa
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
