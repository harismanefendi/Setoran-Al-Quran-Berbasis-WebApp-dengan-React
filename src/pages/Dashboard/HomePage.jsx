import { Link } from "react-router-dom";
import "../../style.css";

const HomePage = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: "url('url-ke-svg-anda.svg') center/cover no-repeat", // Ganti 'url-ke-svg-anda.svg' dengan URL SVG latar belakang Anda
      }}
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-6">Selamat Datang!</h1>
        <div className="items-center  flex flex-col space-y-4">
          <Link to="/admin">
            <button className="relative group bg-gradient-to-b from-green-500 to-green-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105 shadow-2xl">
              <span className="absolute inset-0 bg-opacity-50 bg-white rounded-full transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Admin
            </button>
          </Link>
          <Link to="/guru">
            <button className="relative group bg-gradient-to-b from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105 shadow-2xl">
              <span className="absolute inset-0 bg-opacity-50 bg-white rounded-full transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Guru
            </button>
          </Link>
          <Link to="/siswa">
            <button className="relative group bg-gradient-to-b from-green-500 to-green-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105 shadow-2xl">
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
