import React from "react";
import { Link } from "react-router-dom"; // Import Link untuk mengarahkan ke halaman lain

const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-6">Selamat Datang!</h1>
        <div className="flex flex-col space-y-4">
          {/* Mengarahkan ke halaman login sesuai peran */}
          <Link to="/admin">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Admin</button>
          </Link>
          <Link to="/guru">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Guru</button>
          </Link>
          <Link to="/siswa">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Siswa</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
