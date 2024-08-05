import React, { useEffect, useState } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import StudentPDFDocument from "./StudentPDFDocument";
import { db } from "../../../config/firebase/index";

const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const kelas = "kelas_anda"; // Ganti dengan nama kelas yang sesuai

  useEffect(() => {
    const studentsRef = dbRef(db, "siswa");
    const unsubscribeList = [];

    onValue(studentsRef, (snapshot) => {
      const students = [];

      snapshot.forEach((childSnapshot) => {
        const student = childSnapshot.val();
        const emailKey = student.email.replace(/[.$#[\]]/g, ",");
        const ratingsRef = dbRef(db, `feedbackSetoran/${emailKey}`);
        const setoranRef = dbRef(db, `setoran/${emailKey}`);

        const unsubscribeRatings = onValue(ratingsRef, (ratingSnapshot) => {
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

          const unsubscribeSetoran = onValue(setoranRef, (setoranSnapshot) => {
            const juzSet = new Set();

            setoranSnapshot.forEach((setoranChild) => {
              const setoran = setoranChild.val();
              if (setoran.kelas === kelas && setoran.status === "Diterima") {
                juzSet.add(setoran.juz);
              }
            });

            const juzArray = Array.from(juzSet).sort();
            const updatedStudent = {
              ...student,
              averageRating,
              juz: juzArray.join(", "),
              kelas: student.kelas, // Pastikan kelas dimasukkan ke objek student
            };

            setStudentData((prevStudents) => {
              const studentExists = prevStudents.some((s) => s.email === updatedStudent.email);
              if (studentExists) {
                return prevStudents.map((s) => (s.email === updatedStudent.email ? updatedStudent : s));
              } else {
                return [...prevStudents, updatedStudent];
              }
            });
          });

          unsubscribeList.push(unsubscribeSetoran);
        });

        unsubscribeList.push(unsubscribeRatings);
      });

      setLoading(false);
    });

    return () => {
      unsubscribeList.forEach((unsubscribe) => unsubscribe());
    };
  }, [kelas]);

  return (
    <div className="container mx-auto font-body">
      <h1 className="text-3xl font-bold mb-6 text-center">Peringkat Hafiz</h1>
      {!isLoading ? (
        <>
          <PDFDownloadLink document={<StudentPDFDocument students={studentData} />} fileName="Laporan_Hafalan_Siswa.pdf">
            {({ loading }) => (loading ? "Memuat dokumen..." : "Unduh PDF")}
          </PDFDownloadLink>
          <div style={{ marginTop: 20 }}>
            <PDFViewer width="100%" height="600">
              <StudentPDFDocument students={studentData} />
            </PDFViewer>
          </div>
        </>
      ) : (
        <p className="text-center text-xl">Memuat...</p>
      )}
    </div>
  );
};

export default StudentList;
