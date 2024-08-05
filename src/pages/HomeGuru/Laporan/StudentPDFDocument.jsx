import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#bdbdbd",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

const StudentPDFDocument = ({ students }) => {
  // Mengurutkan siswa berdasarkan kelas dan nama
  const sortedStudents = students.sort((a, b) => {
    if (a.kelas === b.kelas) {
      return a.name.localeCompare(b.name);
    }
    return a.kelas.localeCompare(b.kelas);
  });

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Laporan Hafalan Siswa</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>No</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Nama</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Kelas</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Rata-rata Rating</Text>
            </View>
          </View>
          {sortedStudents.map((student, index) => (
            <View style={styles.tableRow} key={student.email}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{student.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{student.kelas}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{student.averageRating > 0 ? student.averageRating.toFixed(1) : ""}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default StudentPDFDocument;
