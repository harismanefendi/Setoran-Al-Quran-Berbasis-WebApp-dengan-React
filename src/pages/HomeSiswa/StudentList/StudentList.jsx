import React, { useEffect, useState } from "react";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import UserRating from "../UserRating/UserRating";
import TrophySecond from "./TrophySecond";
import TrophyThird from "./TrophyThird";
import TrophyFirst from "./TrophyFirst";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@nextui-org/react"; // Impor Avatar

const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const studentsRef = dbRef(db, "siswa");

    const unsubscribeList = [];

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
      unsubscribeList.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return (
    <div className="container mx-auto font-body">
      <h1 className="text-3xl font-bold mb-6 text-center">Peringkat Hafiz</h1>
      <AnimatePresence>
        {!isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentData
              .sort((a, b) => b.averageRating - a.averageRating)
              .map((student, index) => (
                <motion.div
                  key={student.email}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg p-4 shadow-lg flex items-center relative hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="flex items-center w-full">
                    <div className="mr-4">
                      <Avatar isBordered color="success" src={student.profileImageUrl} className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover" alt={`Foto ${student.name}`} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        {index >= 3 ? `${index + 1}. ` : ""}
                        {student.name}
                      </h3>
                      <div className="absolute top-8 right-3 -mt-3">
                        {index === 0 && <TrophyFirst />}
                        {index === 1 && <TrophySecond />}
                        {index === 2 && <TrophyThird />}
                      </div>
                      <div className="text-gray-600 text-sm flex  items-center">
                        <span className="mr-2">Rata-rata Rating:</span>
                        <UserRating averageRating={student.averageRating} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          <p className="text-center text-xl">Memuat...</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentList;
