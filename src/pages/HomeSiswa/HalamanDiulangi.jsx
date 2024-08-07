import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase";
import KomponenFeedback from "../../components/FeedbackSiswa/KomponenFeedback";
import Loading from "../../components/LoadingFeedback/Loading";
import NavigationBar from "./Navigate/NavigationBar";

function HalamanDiulangi() {
  const [feedbackList, setFeedbackList] = useState([]);
  const userEmail = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    const userEmailKey = userEmail.replace(".", ",");
    const setoranRef = ref(db, `setoran/${userEmailKey}`);

    get(setoranRef).then((setoranSnapshot) => {
      if (setoranSnapshot.exists()) {
        const setoranData = setoranSnapshot.val();
        console.log("Setoran Data:", setoranData);

        const filteredData = Object.keys(setoranData).reduce((acc, key) => {
          if (setoranData[key].status === "Diulangi") {
            acc.push({
              ...setoranData[key],
            });
          }
          return acc;
        }, []);
        setFeedbackList(filteredData);
      } else {
        console.log("No setoran data available");
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
    <div>
      <div className="container mx-auto p-4">
        {feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => <KomponenFeedback key={index} feedback={feedback} renderStars={renderStars} text={"Setoran Diterima"} />)
        ) : (
          <div className="">
            {Array.from({ length: 5 }, (_, index) => (
              <Loading key={index} text={"Setoran Diulangi..."} />
            ))}
          </div>
        )}
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-white py-3 px-2 shadow-lg">
        <NavigationBar />
      </div>
      <div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default HalamanDiulangi;
