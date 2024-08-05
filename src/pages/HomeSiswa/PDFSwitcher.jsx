import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PDFSwitcher = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const navigate = useNavigate(); // Deklarasi useNavigate di sini

  const handleViewPdf1Click = () => {
    setSelectedPdf("pdf1");
  };

  const handleViewPdf2Click = () => {
    setSelectedPdf("pdf2");
  };

  return (
    <div className="main-wrapper container mx-auto py-4">
      <div className="flex justify-center space-x-4 mb-4">
        <div className="card bg-white shadow-md rounded-lg p-4 text-center">
          <h5 className="mb-2 text-xl font-semibold">Model Sistem Informasi UIN Suska</h5>
          <p className="text-gray-600 mb-4">Form 1</p>
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2" onClick={handleViewPdf1Click}>
            View Form 1
          </button>
        </div>
        <div className="card bg-white shadow-md rounded-lg p-4 text-center">
          <h5 className="mb-2 text-xl font-semibold">Model Pesantren Al-Uswah</h5>
          <p className="text-gray-600 mb-4">Form 2</p>
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2" onClick={handleViewPdf2Click}>
            View Form 2
          </button>
        </div>
      </div>
      <div className="">
        <button
          className="text-end text-blue-500 hover:text-red-500"
          onClick={() => navigate("/home/login")} // Menggunakan navigate di sini
        >
          keluar
        </button>
      </div>
      <div className="flex w-full justify-center mt-4">
        <div className="w-full">
          {selectedPdf === "pdf1" && <iframe src="download-form" width="100%" height="800px" title="PDF 1" className="border rounded-lg shadow-md" />}
          {selectedPdf === "pdf2" && <iframe src="download-form2" width="100%" height="800px" title="PDF 2" className="border rounded-lg shadow-md" />}
        </div>
      </div>
    </div>
  );
};

export default PDFSwitcher;
