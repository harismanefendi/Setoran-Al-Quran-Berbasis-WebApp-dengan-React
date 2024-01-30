import React, { useEffect, useState } from "react";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import UserRating from "../UserRating/UserRating";
import TrophySecond from "./TrophySecond";
import TrophyThird from "./TrophyThird";
import TrophyFirst from "./TrophyFirst";

const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const studentsRef = dbRef(db, "siswa");

    const unsubscribeList = []; // Untuk menyimpan fungsi unsubscribe

    onValue(studentsRef, (snapshot) => {
      const students = [];

      snapshot.forEach((childSnapshot) => {
        const student = childSnapshot.val();
        const emailKey = student.email.replace(/[.$#[\]]/g, ",");
        const ratingsRef = dbRef(db, `feedbackSetoran/${emailKey}`);

        const unsubscribe = onValue(ratingsRef, (ratingSnapshot) => {
          let totalRating = 0;
          let count = 0;

          ratingSnapshot.forEach((ratingChild) => {
            const rating = parseFloat(ratingChild.val().rating);
            if (!isNaN(rating)) {
              totalRating += rating;
              count++;
            }
          });

          const averageRating = count > 0 ? totalRating / count : 0;
          const updatedStudent = { ...student, averageRating };

          setStudentData((prevStudents) => {
            const studentExists = prevStudents.some((s) => s.email === updatedStudent.email);
            if (studentExists) {
              return prevStudents.map((s) => (s.email === updatedStudent.email ? updatedStudent : s));
            } else {
              return [...prevStudents, updatedStudent];
            }
          });
        });

        unsubscribeList.push(unsubscribe);
      });

      setLoading(false);
    });

    return () => {
      unsubscribeList.forEach((unsubscribe) => unsubscribe()); // Bersihkan listener saat komponen di-unmount
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Daftar Siswa</h1>
      {!isLoading ? (
        studentData
          .sort((a, b) => b.averageRating - a.averageRating) // Urutkan siswa setiap kali render
          .map((student, index) => (
            <div key={student.email} className="bg-white rounded-lg p-4 mb-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                <div className="flex justify-center">
                  {index === 0 && <TrophyFirst />}
                  {index === 1 && <TrophySecond />}
                  {index === 2 && <TrophyThird />}
                </div>
                {index + 1}. {student.name}
              </h3>
              <div className="text-gray-600">Rating:</div>
              <UserRating averageRating={student.averageRating} />
            </div>
          ))
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default StudentList;
