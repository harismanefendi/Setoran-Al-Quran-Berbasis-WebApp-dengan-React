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
    const feedbackRef = ref(db, `feedbackSetoran/${userEmailKey}`);
    const setoranRef = ref(db, `setoran/${userEmailKey}`);

    get(feedbackRef).then((feedbackSnapshot) => {
      if (feedbackSnapshot.exists()) {
        get(setoranRef).then((setoranSnapshot) => {
          if (setoranSnapshot.exists()) {
            const feedbackData = feedbackSnapshot.val();
            const setoranData = setoranSnapshot.val();
            const combinedData = Object.keys(feedbackData).reduce((acc, key) => {
              if (setoranData[key] && setoranData[key].status === "Diulangi") {
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
    <div>
      <div className="container mx-auto p-4">
        {feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => <KomponenFeedback key={index} feedback={feedback} renderStars={renderStars} text={"Setoran Diulangi"} />)
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
    </div>
  );
}

export default HalamanDiulangi;
