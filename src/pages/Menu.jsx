import React from "react";

function Menu() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex-grow">
        {/* Konten halaman Anda di sini */}
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-semibold text-center">Konten Halaman Anda</h1>
          {/* Isi konten halaman */}
        </div>
      </div>

      {/* Tombol-tombol yang tetap di layar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 py-4">
        <div className="container mx-auto flex justify-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Tombol 1</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Tombol 2</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Tombol 3</button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">Tombol 4</button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
