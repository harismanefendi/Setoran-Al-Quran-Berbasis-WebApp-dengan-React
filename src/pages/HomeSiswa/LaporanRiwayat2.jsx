import React, { useEffect, useState } from "react";
import { Document, Font, Image, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { getDatabase, ref as dbRef, get, onValue } from "firebase/database";
import logo from "../../assets/logoUIN.png";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

Font.register({ family: "Averia Serif Libre", src: "http://fonts.gstatic.com/s/averiaseriflibre/v5/fdtF30xa_Erw0zAzOoG4BeKzPr0x8JMzFIz_Js1kWgQ.ttf" });

function LaporanRiwayat2() {
  const [userData, setUserData] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [setoranList, setSetoranList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      const db = getDatabase();
      const emailKey = storedUser.email.replace(/[.$#[\]]/g, ",");
      const userRef = dbRef(db, `siswa/${emailKey}`);

      const unsubscribe = onValue(userRef, async (snapshot) => {
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

  useEffect(() => {
    if (userData) {
      generatePDF();
    }
  }, [userData, setoranList, feedbackList]);

  let lastJuz = null;
  const displayedJuz = new Set();

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 10,
      fontFamily: "Averia Serif Libre",
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
      width: "100%", // Membuat baris tabel mengambil lebar penuh dari halaman
      borderBottomColor: "#000", // Tambahkan border di bawah setiap baris
      borderBottomWidth: 1, // Ketebalan border
    },
    tableRow2: {
      flexDirection: "row",
      width: "100%", // Membuat baris tabel mengambil lebar penuh dari halaman
      borderBottomColor: "#000", // Tambahkan border di bawah setiap baris
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

  const generatePDF = () => {
    const MyDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ marginRight: "auto" }}>
                <Text style={[styles.heading]}>
                  JUZ {/* Iterasi melalui setoranList dan cetak juz hanya jika belum ditampilkan */}
                  {setoranList.map((setoran, index) => {
                    if (!displayedJuz.has(setoran.juz)) {
                      displayedJuz.add(setoran.juz);
                      return `${setoran.juz} `;
                    }
                    return null;
                  })}
                </Text>
                <Text style={[styles.heading]}></Text>
              </View>
              <View style={{ textAlign: "center", flex: 1 }}>
                <Text style={[styles.heading, { lineHeight: "0.5" }]}>KURIKULUM TAHFIZH AL-QURAN</Text>
                <Text style={[styles.heading]}>KELAS {userData.kelas} SEMESTER GENAP</Text>
              </View>
            </View>

            <View style={[styles.table, { marginRight: "1cm" }]} layout="full">
              <View style={[styles.tableRow2, { borderBottom: "1", borderTop: "1" }]}>
                <Text rowSpan={4} style={[styles.tableCell2, { width: "3.6cm", textAlign: "center" }]}>
                  Tanggal
                </Text>
                <Text rowSpan={3} style={[styles.tableCell, { width: "8cm", textAlign: "center" }]}>
                  SURAT/AYAT
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "7cm", textAlign: "center" }]}>
                  MUSTAMI'
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "2cm", textAlign: "center", borderRight: "1" }]}>
                  NILAI
                </Text>
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
                        <Text rowSpan={4} style={[styles.tableCell, { width: "3.3cm" }]}>
                          {setoran.hariTanggal}
                        </Text>
                        <Text rowSpan={3} style={[styles.tableCell, { width: "7.34cm" }]}>
                          {surah.trim()} {setoran.ayatAwal}-{setoran.ayatAkhir}
                        </Text>
                        <Text colSpan={7} style={[styles.tableCell, { width: "6.41cm", textAlign: "center" }]}>
                          {namaUstadz}
                        </Text>
                        <Text colSpan={7} style={[styles.tableCell, { width: "1cm", textAlign: "right" }]}>
                          {rating}
                        </Text>
                      </View>
                    );
                  });
                })}
            </View>
          </View>
          ;
        </Page>
      </Document>
    );

    // Set PDF data to state
    setPdfData(<MyDocument />);
  };

  if (!userData) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <PDFViewer width="100%" height="600px">
        {pdfData}
      </PDFViewer>
    </div>
  );
}

export default LaporanRiwayat2;
