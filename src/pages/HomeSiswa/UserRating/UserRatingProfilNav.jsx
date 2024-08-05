import React, { useEffect, useState } from "react";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";

const UserRatingProfil = ({ userEmail }) => {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const emailKey = userEmail.replace(/[.$#[\]]/g, ",");
    const ratingsRef = dbRef(db, `feedbackSetoran/${emailKey}`);

    onValue(ratingsRef, (snapshot) => {
      let totalRating = 0;
      let count = 0;

      snapshot.forEach((childSnapshot) => {
        const rating = parseFloat(childSnapshot.val().rating);
        if (rating) {
          totalRating += rating;
          count += 1;
        }
      });

      if (count > 0) {
        const average = totalRating / count;
        setAverageRating(average.toFixed(1));
      } else {
        setAverageRating("No ratings yet");
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
    <div
      className=" flex gap-2 px-1
    
    flex-row text-center"
    >
      <p className="text-blue-500 ">Rating Hafalan :</p>
      <div className="">{averageRating ? renderStars(averageRating) : "Loading..."}</div>
    </div>
  );
};

export default UserRatingProfil;
