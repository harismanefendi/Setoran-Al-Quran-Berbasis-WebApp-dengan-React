import React from "react";
import { Link } from "react-router-dom"; // Jika Anda menggunakan React Router
import "tailwindcss/tailwind.css"; // Pastikan telah mengimpor Tailwind CSS

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-3xl font-semibold text-red-500 mb-4">404</h2>
        <p className="text-xl">Halaman Not Found</p>
        <p className="text-black mt-2">Selamat, Anda termasuk bagian anak futurrr class.</p>
        <div className="mt-4">
          <Link
            to="/" // Ganti dengan URL beranda aplikasi Anda
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
