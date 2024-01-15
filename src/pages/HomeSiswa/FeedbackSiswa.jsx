import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase";

function FeedbackSiswa() {
  const [feedbackList, setFeedbackList] = useState([]);
  const userEmail = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    const userEmailKey = userEmail.replace(".", ",");
    const feedbackRef = ref(db, `feedbackSetoran/${userEmailKey}`);
    const setoranRef = ref(db, `setoran/${userEmailKey}`);

    get(feedbackRef).then((feedbackSnapshot) => {
      if (feedbackSnapshot.exists()) {
        get(setoranRef).then((setoranSnapshot) => {
          if (setoranSnapshot.exists()) {
            // Gabungkan data feedback dengan data setoran
            const feedbackData = feedbackSnapshot.val();
            const setoranData = setoranSnapshot.val();
            const combinedData = Object.keys(feedbackData).map((key) => {
              return {
                ...setoranData[key], // Pertama ambil data setoran
                ...feedbackData[key], // Kemudian gabungkan dengan data feedback
              };
            });
            setFeedbackList(combinedData);
          }
        });
      } else {
        console.log("No feedback data available");
      }
    });
  }, [userEmail]);

  const renderStars = (rating) => {
    // Konversi rating dari string ke angka
    const numericRating = parseFloat(rating);

    let stars = [];
    let fullStars = Math.floor(numericRating / 2); // Hitung jumlah bintang penuh
    let hasHalfStar = numericRating % 2 !== 0; // Cek apakah ada setengah bintang
    let decimal = numericRating % 1; // Ambil angka desimal// Cek apakah ada setengah bintang

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>
        ); // Bintang penuh dengan warna kuning
      } else if (hasHalfStar) {
        stars.push(
          <span key={i} className="text-gray-300" style={{ position: "relative" }}>
            <span
              className="text-yellow-500"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "50%",
                overflow: "hidden",
              }}
            >
              ★
            </span>
            ★
          </span>
        ); // Setengah bintang dengan sebelah kiri kuning dan sebelah kanan putih
        hasHalfStar = false;
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        ); // Bintang kosong dengan warna abu-abu
      }
    }

    // Tambahkan angka desimal di belakang rating jika rating adalah angka
    if (!isNaN(numericRating)) {
      stars.push(
        <span key="rating" className="text-gray-600 ml-1">
          {numericRating.toFixed(1)}
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="container mx-auto p-4">
      {feedbackList.length > 0 ? (
        feedbackList.map((feedback, index) => (
          <div key={index} className="bg-white rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-lg font-semibold mb-2">Feedback untuk Hafalan:</h3>
            <p className="text-gray-600">Surah Awal: {feedback.suratAwal}</p>
            <p className="text-gray-600">Surah Akhir: {feedback.suratAkhir}</p>
            <p className="text-gray-600">Ayat Awal: {feedback.ayatAwal}</p>
            <p className="text-gray-600">Ayat Akhir: {feedback.ayatAkhir}</p>
            <p className="text-gray-600">Status Setoran: {feedback.status}</p>
            <div className="flex items-center mb-1">
              <p className="text-lg font-semibold mr-2">Rating:</p>
              {renderStars(feedback.rating)}
            </div>
            <p className="text-gray-600">Komentar: {feedback.komentar}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">Belum ada feedback.</p>
      )}
    </div>
  );
}

export default FeedbackSiswa;
