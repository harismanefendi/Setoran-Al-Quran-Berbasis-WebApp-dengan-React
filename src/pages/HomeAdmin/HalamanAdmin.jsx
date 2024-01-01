import React from "react";

const HalamanAdmin = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex justify-between max-w-4xl mx-auto">
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="/halaman-admin/panel-admin">Guru</a>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="/halaman-admin/panel-siswa">Siswa</a>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="#profil">Profil</a>
        </li>
        <li className="hover:bg-blue-700 transition-colors duration-300 p-2 rounded">
          <a href="#kelas">Kelas</a>
        </li>
      </ul>
    </nav>
  );
};

export default HalamanAdmin;
