import React, { useEffect, useState } from "react";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import UserRating from "../UserRating/UserRating";
import TrophySecond from "./TrophySecond";
import TrophyThird from "./TrophyThird";
import TrophyFirst from "./TrophyFirst";
import Picture from "../../../components/UnknownFoto/Picture";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="container mx-auto p-4 font-body">
      <h1 className="text-2xl font-semibold mb-4">Hafiz Ranking</h1>
      <AnimatePresence>
        {!isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentData
              .sort((a, b) => b.averageRating - a.averageRating)
              .map((student, index) => (
                <motion.div
                  key={student.email}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 2 }}
                  className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center relative"
                >
                  <div className="absolute top-7 left-6 transform -translate-x-1/2 -translate-y-1/2">
                    {index === 0 && <TrophyFirst />}
                    {index === 1 && <TrophySecond />}
                    {index === 2 && <TrophyThird />}
                  </div>
                  <div className="mb-2">{student.profileImageUrl && student.profileImageUrl !== "" ? <img src={student.profileImageUrl} className="w-16 h-16 rounded-full object-cover" alt={`Foto ${student.name}`} /> : <Picture />}</div>
                  <h3 className="text-lg font-semibold text-center">
                    {index >= 3 ? `${index + 1}. ` : ""}
                    {student.name}
                  </h3>

                  <div className="text-gray-600 mt-1">Rating:</div>
                  <UserRating averageRating={student.averageRating} />
                </motion.div>
              ))}
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentList;
