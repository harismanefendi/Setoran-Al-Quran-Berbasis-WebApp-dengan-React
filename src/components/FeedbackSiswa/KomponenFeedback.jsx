import React from "react";

const KomponenFeedback = ({ feedback, renderStars, text }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2">{text}</h3>
      <p className="text-gray-600">Surah: {feedback.suratAwal}</p>
      <p className="text-gray-600">Ayat Awal: {feedback.ayatAwal}</p>
      <p className="text-gray-600">Ayat Akhir: {feedback.ayatAkhir}</p>
      <p className="text-gray-600">Status Setoran: {feedback.status}</p>
      <div className="flex items-center mb-1">
        <p className="text-lg font-semibold mr-2">Rating:</p>
        {renderStars(feedback.rating)}
      </div>
      <p className="text-gray-600">Komentar: {feedback.komentar}</p>
    </div>
  );
};

export default KomponenFeedback;
