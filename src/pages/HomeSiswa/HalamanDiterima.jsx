import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase";

function HalamanDiterima() {
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
            const feedbackData = feedbackSnapshot.val();
            const setoranData = setoranSnapshot.val();
            const combinedData = Object.keys(feedbackData).reduce((acc, key) => {
              if (setoranData[key] && setoranData[key].status === "Diterima") {
                acc.push({
                  ...setoranData[key],
                  ...feedbackData[key],
                });
              }
              return acc;
            }, []);
            setFeedbackList(combinedData);
          }
        });
      } else {
        console.log("No feedback data available");
      }
    });
  }, [userEmail]);

  const renderStars = (rating) => {
    let stars = [];
    let ratingInt = parseInt(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= ratingInt ? "text-yellow-500" : "text-gray-300"}>
          ★
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
        <p className="text-center text-gray-600">Belum ada feedback untuk setoran yang diterima.</p>
      )}
    </div>
  );
}

export default HalamanDiterima;
