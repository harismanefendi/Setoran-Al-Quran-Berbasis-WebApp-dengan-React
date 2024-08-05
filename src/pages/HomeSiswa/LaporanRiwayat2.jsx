import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { getDatabase, ref as dbRef, get, onValue } from "firebase/database";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

function LaporanRiwayat2() {
  const [userData, setUserData] = useState(null);
  const [setoranList, setSetoranList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      const db = getDatabase();
      const emailKey = storedUser.email.replace(/[.$#[\]]/g, ",");
      const userRef = dbRef(db, `siswa/${emailKey}`);

      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData({
            name: data.name || "Nama Tidak Diketahui",
            age: data.age || "Umur Tidak Diketahui",
            kelas: data.kelas || "Kelas Tidak Diketahui",
          });
        }
      });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      const db = getDatabase();
      const emailKey = storedUser.email.replace(/[.$#[\]]/g, ",");
      const setoranRef = dbRef(db, `setoran/${emailKey}`);

      const unsubscribe = onValue(setoranRef, (snapshot) => {
        if (snapshot.exists()) {
          const setoranData = snapshot.val();
          const setoranArray = Object.keys(setoranData).map((key) => ({
            id: key,
            hariTanggal: new Date(setoranData[key].tanggal).toLocaleString("id-ID", { year: "numeric", month: "long", day: "numeric" }),
            suratAwal: setoranData[key].suratAwal,
            status: setoranData[key].status,
            ayatAwal: setoranData[key].ayatAwal,
            ayatAkhir: setoranData[key].ayatAkhir,
            juz: setoranData[key].juz,
          }));
          setSetoranList(setoranArray);
        } else {
          console.log("No setoran data available");
          setSetoranList([]);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      const db = getDatabase();
      const emailKey = storedUser.email.replace(/[.$#[\]]/g, ",");
      const setoranRef = dbRef(db, `feedbackSetoran/${emailKey}`);

      const unsubscribe = onValue(setoranRef, (snapshot) => {
        if (snapshot.exists()) {
          const feedbackData = snapshot.val();
          const feedbackArray = Object.keys(feedbackData).map((key) => ({
            id: key,
            suratAwal: feedbackData[key].suratAwal,
            status: feedbackData[key].status,
            komentar: feedbackData[key].komentar,
            tajwid: feedbackData[key].tajwid,
            rating: feedbackData[key].rating,
            namaUstadz: feedbackData[key].namaUstadz,
          }));
          setFeedbackList(feedbackArray);
        } else {
          console.log("No feedback data available");
          setFeedbackList([]);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 10,
      marginRight: "1cm",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    heading: {
      fontWeight: "bold",
      fontSize: 12,
      textAlign: "center",
      marginBottom: 10,
    },
    info: {
      fontSize: 9.5,
      marginBottom: 4,
    },
    table: {
      width: "100%",
      flexGrow: 1,
    },
    tableRow: {
      flexDirection: "row",
      width: "100%",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
    },
    tableRow2: {
      flexDirection: "row",
      width: "100%",
      borderBottomColor: "#000",
    },
    tableCell: {
      padding: 5,
      borderLeftWidth: 1,
      borderColor: "#000",
      fontSize: 12,
    },
    tableCell2: {
      padding: 5,
      borderLeftWidth: 1,
      fontSize: 12,
    },
    fontBold: {
      fontWeight: "bold",
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ marginRight: "auto" }}>
              <Text style={[styles.heading]}>
                JUZ{" "}
                {setoranList
                  .map((setoran) => setoran.juz)
                  .filter((juz, index, self) => self.indexOf(juz) === index)
                  .join(", ")}
              </Text>
            </View>
            <View style={{ textAlign: "center", flex: 1 }}>
              <Text style={[styles.heading, { lineHeight: "0.5" }]}>KURIKULUM TAHFIZH AL-QURAN</Text>
              <Text style={[styles.heading]}>KELAS {userData?.kelas} SEMESTER GENAP</Text>
            </View>
          </View>

          <View style={[styles.table, { marginRight: "1cm" }]}>
            <View style={[styles.tableRow2, { borderBottom: "1", borderTop: "1" }]}>
              <Text style={[styles.tableCell2, { width: "3.6cm", textAlign: "center" }]}>Tanggal</Text>
              <Text style={[styles.tableCell, { width: "8cm", textAlign: "center" }]}>SURAT/AYAT</Text>
              <Text style={[styles.tableCell, { width: "7cm", textAlign: "center" }]}>MUSTAMI'</Text>
              <Text style={[styles.tableCell, { width: "2cm", textAlign: "center", borderRight: "1" }]}>NILAI</Text>
            </View>

            {setoranList
              .filter((setoran) => setoran.status === "Diterima")
              .map((setoran, index) => {
                const surahNames = setoran.suratAwal.split(",");
                return surahNames.map((surah, surahIndex) => {
                  const matchingFeedback = feedbackList.find((feedback) => feedback.id === setoran.id);
                  const komentar = matchingFeedback ? matchingFeedback.komentar : "No komentar";
                  const tajwid = matchingFeedback ? matchingFeedback.tajwid : "";
                  const rating = matchingFeedback ? matchingFeedback.rating : "";
                  const namaUstadz = matchingFeedback ? matchingFeedback.namaUstadz : "";

                  return (
                    <View key={`${index}_${surahIndex}`} style={[styles.tableRow, { borderRightWidth: "1" }]}>
                      <Text style={[styles.tableCell, { width: "3.3cm" }]}>{setoran.hariTanggal}</Text>
                      <Text style={[styles.tableCell, { width: "7.34cm" }]}>
                        {surah.trim()} {setoran.ayatAwal}-{setoran.ayatAkhir}
                      </Text>
                      <Text style={[styles.tableCell, { width: "6.41cm", textAlign: "center" }]}>{namaUstadz}</Text>
                      <Text style={[styles.tableCell, { width: "1cm", textAlign: "right" }]}>{rating}</Text>
                    </View>
                  );
                });
              })}
          </View>
        </View>
      </Page>
    </Document>
  );

  if (!userData) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <PDFDownloadLink document={<MyDocument />} fileName="LaporanRiwayat.pdf">
        {({ loading }) => (loading ? "Memuat dokumen..." : "Unduh PDF")}
      </PDFDownloadLink>
      <div className="pdf-viewer">
        <PDFViewer width="100%" height="100%">
          <MyDocument />
        </PDFViewer>
      </div>
    </div>
  );
}

export default LaporanRiwayat2;
