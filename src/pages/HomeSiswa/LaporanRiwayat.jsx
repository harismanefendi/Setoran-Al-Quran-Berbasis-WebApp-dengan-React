import React, { useEffect, useState } from "react";
import { Document, Font, Image, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { getDatabase, ref as dbRef, get, onValue } from "firebase/database";
import logo from "../../assets/logoUIN.png";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

function LaporanRiwayat() {
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
            hariTanggal: new Date(setoranData[key].tanggal).toLocaleString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
            suratAwal: setoranData[key].suratAwal,
            status: setoranData[key].status,
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
            kelancaran: feedbackData[key].kelancaran,
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

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 10,
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
      fontSize: 9.5,
    },
    tableCell2: {
      padding: 5,
      borderLeftWidth: 1,
      fontSize: 9.5,
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.heading, { paddingLeft: "1.75cm" }]}>FORM PENILAIAN HAFALAN AL QURAN JUZ 30 </Text>
                <Text style={[styles.heading, { paddingLeft: "1.75cm" }]}>MAHASISWA PROGRAM STUDI SISTEM INFORMASI</Text>
                <Text style={[styles.heading, { paddingLeft: "1.75cm" }]}>FAKULTAS SAINS DAN TEKNOLOGI UIN SUSKA RIAU</Text>
              </View>
              <View>
                <Image style={{ width: "55px", marginBottom: "4px", marginRight: "12px" }} src={logo} alt="" />
                <Text style={{ fontSize: "10px", marginLeft: "2px" }}>Form PA-02</Text>
              </View>
            </View>

            <Text style={styles.info}>Sebaik baik kamu sekalian adalah yang mempelajari Al-Quran dan mengajarkannya.(HR.Bukhari)</Text>

            <View style={[styles.table]} layout="full">
              <View style={[styles.tableRow, { width: "100%", borderTopWidth: 1, borderRightWidth: 1 }]}>
                <Text rowSpan={2} style={[styles.tableCell, { width: "3.92cm" }]} colSpan={2}>
                  Nama Dosen PA
                </Text>
                <Text style={styles.tableCell} colSpan={10}></Text>
              </View>

              <View style={[styles.tableRow, { width: "100%", borderRightWidth: 1 }]}>
                <Text rowSpan={2} style={[styles.tableCell, { width: "3.92cm" }]} colSpan={2}>
                  NIP
                </Text>
                <Text style={styles.tableCell} colSpan={10}></Text>
              </View>
              <View style={[styles.tableRow, { width: "100%", borderRightWidth: 1 }]}>
                <Text rowSpan={2} style={[styles.tableCell, { width: "3.92cm" }]} colSpan={2}>
                  Nama Mahasiswa
                </Text>
                <Text style={styles.tableCell} colSpan={10}>
                  {userData.name}
                </Text>
              </View>
              <View style={[styles.tableRow, { width: "100%", borderRightWidth: 1 }]}>
                <Text rowSpan={2} style={[styles.tableCell, { width: "3.92cm" }]} colSpan={2}>
                  NIM
                </Text>
                <Text style={styles.tableCell} colSpan={10}></Text>
              </View>
              <View style={[styles.tableRow, { width: "100%", borderRightWidth: 1 }]}>
                <Text rowSpan={2} style={[styles.tableCell, { width: "3.92cm" }]} colSpan={2}>
                  Angkatan
                </Text>
                <Text style={styles.tableCell} colSpan={10}></Text>
              </View>
              <View style={[styles.tableRow2, { borderRightWidth: 1 }]}>
                <Text rowSpan={2} style={[styles.tableCell, { width: "1cm", backgroundColor: "#D3D3D3" }]}></Text>
                <Text rowSpan={4} style={[styles.tableCell2, { backgroundColor: "#D3D3D3", width: "3cm", borderBottom: "none" }]}></Text>
                <Text rowSpan={3} style={[styles.tableCell, { width: "2.5cm", backgroundColor: "#D3D3D3" }]}></Text>
                <Text colSpan={7} style={[styles.tableCell, styles.fontBold, { fontWeight: "bold", width: "6.3cm", borderBottom: "1", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  Keterangan
                </Text>
                <Text rowSpan={3} style={[styles.tableCell, { width: "4.8cm", backgroundColor: "#D3D3D3" }]}></Text>
                <Text rowSpan={3} style={[styles.tableCell, { width: "1.67cm", backgroundColor: "#D3D3D3" }]}></Text>
              </View>
              <View style={[styles.tableRow2, { borderRightWidth: 1 }]}>
                <Text rowSpan={2} style={[styles.tableCell, { width: "1cm", backgroundColor: "#D3D3D3" }]}>
                  No
                </Text>
                <Text rowSpan={4} style={[styles.tableCell2, { backgroundColor: "#D3D3D3", width: "3cm" }]}>
                  Tanggal
                </Text>
                <Text rowSpan={3} style={[styles.tableCell, { width: "2.5cm", backgroundColor: "#D3D3D3" }]}>
                  Surah
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "2.7cm", borderBottom: "1", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  Kelancaran
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "3.6cm", borderBottom: "1", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  Tajwid
                </Text>
                <Text rowSpan={3} style={[styles.tableCell, { width: "4.8cm", backgroundColor: "#D3D3D3" }]}>
                  Komentar/ Saran PA
                </Text>
                <Text rowSpan={3} style={[styles.tableCell, { backgroundColor: "#D3D3D3" }]}>
                  Paraf Pa
                </Text>
              </View>
              <View style={[styles.tableRow, { borderRightWidth: 1 }]}>
                <Text rowSpan={2} style={[styles.tableCell, { width: "1cm", backgroundColor: "#D3D3D3" }]}></Text>
                <Text rowSpan={4} style={[styles.tableCell, { backgroundColor: "#D3D3D3", width: "3cm" }]}></Text>
                <Text rowSpan={3} style={[styles.tableCell, { width: "2.5cm", backgroundColor: "#D3D3D3" }]}></Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  L
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  C
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  TL
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  SB
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  B
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  K
                </Text>
                <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center", backgroundColor: "#D3D3D3" }]}>
                  KS
                </Text>

                <Text rowSpan={3} style={[styles.tableCell, { width: "4.8cm", backgroundColor: "#D3D3D3" }]}></Text>
                <Text rowSpan={3} style={[styles.tableCell, { width: "1.67cm", backgroundColor: "#D3D3D3" }]}></Text>
              </View>
              {setoranList
                .filter((setoran) => setoran.status === "Diterima")
                .map((setoran, index) => {
                  const surahNames = setoran.suratAwal.split(",");
                  return surahNames.map((surah, surahIndex) => {
                    const matchingFeedback = feedbackList.find((feedback) => feedback.id === setoran.id);
                    const komentar = matchingFeedback ? matchingFeedback.komentar : "No komentar";
                    const tajwid = matchingFeedback ? matchingFeedback.tajwid : "";
                    const kelancaran = matchingFeedback ? matchingFeedback.kelancaran : "";

                    return (
                      <View key={`${index}_${surahIndex}`} style={[styles.tableRow, { borderRightWidth: 1 }]}>
                        <Text rowSpan={3} style={[styles.tableCell, { width: "1cm" }]}>
                          {index + 1}
                        </Text>
                        <Text rowSpan={4} style={[styles.tableCell, { width: "3cm" }]}>
                          {setoran.hariTanggal}
                        </Text>
                        <Text rowSpan={3} style={[styles.tableCell, { width: "2.5cm" }]}>
                          {surah.trim()}
                        </Text>
                        <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center" }]}>
                          {kelancaran === "lancar" ? "V" : ""}
                        </Text>
                        <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center" }]}>
                          {kelancaran === "cukup" ? "V" : ""}
                        </Text>
                        <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center" }]}>
                          {kelancaran === "tidak lancar" ? "V" : ""}
                        </Text>
                        <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center" }]}>
                          {tajwid === "sangat baik" ? "V" : ""}
                        </Text>
                        <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center" }]}>
                          {tajwid === "baik" ? "V" : ""}
                        </Text>
                        <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center" }]}>
                          {tajwid === "kurang" ? "V" : ""}
                        </Text>
                        <Text colSpan={7} style={[styles.tableCell, { width: "0.9cm", textAlign: "center" }]}>
                          {tajwid === "kurang sekali" ? "V" : ""}
                        </Text>
                        <Text rowSpan={3} style={[styles.tableCell, { width: "4.8cm" }]}>
                          {komentar}
                        </Text>
                        <Text rowSpan={3} style={[styles.tableCell, { width: "1.67cm" }]}></Text>
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
    <div>
      {!userData ? (
        <LoadingSpinner />
      ) : (
        <div>
          <PDFDownloadLink document={pdfData} fileName="form_penilaian_hafalan.pdf">
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : <button className="btn btn-primary">Download PDF</button>)}
          </PDFDownloadLink>
          <PDFViewer style={{ width: "100%", height: "90vh" }}>{pdfData}</PDFViewer>
        </div>
      )}
    </div>
  );
}

export default LaporanRiwayat;
