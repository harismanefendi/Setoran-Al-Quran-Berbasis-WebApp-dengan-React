import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { ref as dbRef, db } from "../../config/firebase/index";
import { onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import { format, isValid } from "date-fns";
import { id } from "date-fns/locale";

const SetoranDiterima = () => {
  const [setoranList, setSetoranList] = useState([]);
  const [feedbackList, setFeedbackList] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { kelas } = useParams();

  useEffect(() => {
    const setoranRef = dbRef(db, "setoran");
    onValue(setoranRef, (snapshot) => {
      let setoranArray = [];
      const data = snapshot.val();
      if (data) {
        for (const email in data) {
          for (const id in data[email]) {
            const setoran = data[email][id];
            if (setoran.kelas === kelas && setoran.status === "Diterima") {
              setoranArray.push({
                id,
                emailKey: email,
                ...setoran,
              });
            }
          }
        }
        setSetoranList(setoranArray);
      }
    });

    const feedbackRef = dbRef(db, "feedbackSetoran");
    onValue(feedbackRef, (snapshot) => {
      const feedbackData = snapshot.val();
      if (feedbackData) {
        setFeedbackList(feedbackData);
      }
    });
  }, [kelas]);

  const filteredSetoranList = setoranList.filter((setoran) => {
    const setoranDate = new Date(setoran.tanggal);
    if (startDate && endDate) {
      return setoranDate >= startDate && setoranDate <= endDate;
    }
    return true;
  });

  const MyDocument = (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Daftar Setoran Diterima Siswa Kelas {kelas}</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>No</Text>
            <Text style={styles.tableHeaderCell}>Nama</Text>
            <Text style={styles.tableHeaderCell}>Tanggal</Text>
            <Text style={[styles.tableHeaderCell, styles.wideColumn]}>Surat dan Ayat</Text>
            <Text style={styles.tableHeaderCell}>Juz</Text>
            <Text style={styles.tableHeaderCell}>Rating</Text>
          </View>
          {filteredSetoranList.map((setoran, index) => {
            const feedback = feedbackList[setoran.emailKey] && feedbackList[setoran.emailKey][setoran.id] ? feedbackList[setoran.emailKey][setoran.id].rating : "-";
            return (
              <View key={setoran.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{index + 1}</Text>
                <Text style={styles.tableCell}>{setoran.namaPeserta}</Text>
                <Text style={styles.tableCell}>{isValid(new Date(setoran.tanggal)) ? format(new Date(setoran.tanggal), "EEEE, d MMMM yyyy", { locale: id }) : "Tanggal tidak valid"}</Text>
                <Text style={[styles.tableCell, styles.wideColumn]}>
                  {setoran.suratAwal} ayat {setoran.ayatAwal} - {setoran.suratAkhir} ayat {setoran.ayatAkhir}
                </Text>
                <Text style={styles.tableCell}>{setoran.juz}</Text>
                <Text style={styles.tableCell}>{feedback}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-gray-800">Daftar Setoran Diterima Siswa Kelas {kelas}</p>
      </div>
      <div className="mb-4 flex justify-between">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} placeholderText="Pilih tanggal awal" className="px-4 py-2 border rounded-md mr-4" />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} placeholderText="Pilih tanggal akhir" className="px-4 py-2 border rounded-md" />
      </div>
      <PDFDownloadLink document={MyDocument} fileName={`setoran_kelas_${kelas}.pdf`} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink>
      <div className="block lg:hidden">
        {filteredSetoranList.map((setoran, index) => {
          const feedback = feedbackList[setoran.emailKey] && feedbackList[setoran.emailKey][setoran.id] ? feedbackList[setoran.emailKey][setoran.id].rating : "-";
          return (
            <div key={setoran.id} className="mb-4 p-4 border rounded-md shadow-sm">
              <p>
                <strong>No:</strong> {index + 1}
              </p>
              <p>
                <strong>Nama:</strong> {setoran.namaPeserta}
              </p>
              <p>
                <strong>Tanggal:</strong> {isValid(new Date(setoran.tanggal)) ? format(new Date(setoran.tanggal), "EEEE, d MMMM yyyy", { locale: id }) : "Tanggal tidak valid"}
              </p>
              <p>
                <strong>Surat dan Ayat:</strong> {setoran.suratAwal} ayat {setoran.ayatAwal} - {setoran.suratAkhir} ayat {setoran.ayatAkhir}
              </p>
              <p>
                <strong>Juz:</strong> {setoran.juz}
              </p>
              <p>
                <strong>Rating:</strong> {feedback}
              </p>
            </div>
          );
        })}
      </div>
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">No</th>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Tanggal</th>
              <th className="py-3 px-4 text-left" style={{ width: "300px" }}>
                Surat dan Ayat
              </th>
              <th className="py-3 px-4 text-left">Juz</th>
              <th className="py-3 px-4 text-left">Rating</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {filteredSetoranList.map((setoran, index) => {
              const feedback = feedbackList[setoran.emailKey] && feedbackList[setoran.emailKey][setoran.id] ? feedbackList[setoran.emailKey][setoran.id].rating : "-";
              return (
                <tr key={setoran.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-4 text-left">{index + 1}</td>
                  <td className="py-3 px-4 text-left">{setoran.namaPeserta}</td>
                  <td className="py-3 px-4 text-left">{isValid(new Date(setoran.tanggal)) ? format(new Date(setoran.tanggal), "EEEE, d MMMM yyyy", { locale: id }) : "Tanggal tidak valid"}</td>
                  <td className="py-3 px-4 text-left" style={{ width: "300px" }}>
                    {setoran.suratAwal} ayat {setoran.ayatAwal} - {setoran.suratAkhir} ayat {setoran.ayatAkhir}
                  </td>
                  <td className="py-3 px-4 text-left">{setoran.juz}</td>
                  <td className="py-3 px-4 text-left">{feedback}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
    borderCollapse: "collapse",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    marginBottom: 5,
    backgroundColor: "#f3f3f3",
  },
  tableHeaderCell: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
  wideColumn: {
    flex: 3,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderBottomStyle: "solid",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    flex: 1,
    textAlign: "center",
  },
});

export default SetoranDiterima;
