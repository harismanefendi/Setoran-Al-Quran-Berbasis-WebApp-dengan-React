import React from "react";

const UserRating = ({ averageRating }) => {
  const renderStars = (rating) => {
    // Konversi rating dari string ke angka
    const numericRating = parseFloat(rating);

    let stars = [];
    let fullStars = Math.floor(numericRating / 2); // Hitung jumlah bintang penuh
    let hasHalfStar = numericRating % 2 !== 0; // Cek apakah ada setengah bintang
    let decimal = numericRating % 1; // Ambil angka desimal

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
    <div className="mt-4 text-center">
      <p className="text-gray-600">Average Rating:</p>
      <div className="flex justify-center">{averageRating ? renderStars(averageRating) : "Loading..."}</div>
    </div>
  );
};

export default UserRating;
