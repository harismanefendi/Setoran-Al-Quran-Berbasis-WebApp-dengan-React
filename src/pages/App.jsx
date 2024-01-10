import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../config/Routes/AuthContext"; // Import AuthProvider
import PrivateRoute from "../config/Routes/PrivateRoute"; // Import PrivateRoute

import Home from "./HomeSiswa/Home";
import AdminLogin from "./Login/AdminLogin";
import GuruLogin from "./Login/GuruLogin";
import Login from "./Login/Login";
import Menu from "./Menu";
import UserProfile from "./UserProfile";
import NotFound from "./NotFound";
import Register from "./Register/Register";
import QuranSetoranForm from "./QuranSetoranForm";
import Hello from "./Hello";
import DataGuru from "./HomeAdmin/DataGuru";
import HalamanGuru from "./HomeGuru/HalamanGuru";
import HomePage from "./Dashboard/homePage";
import EditProfile from "./EditProfil";
import RegisterAdmin from "./Register/RegisterAdmin";
import RegisterGuru from "./Register/RegisterGuru";
import FileUpload from "./FileUpload";
import FeedbackSiswa from "./HomeSiswa/FeedbackSiswa";
import HalamanAdmin from "./HomeAdmin/HalamanAdmin";
import Setoran from "./HomeAdmin/Setoran";
import HalamanKelas from "./HomeAdmin/HalamanKelas";
import DashboardGuru from "./HomeGuru/DashboardGuru";
import SetoranDiterima from "./HomeGuru/SetoranDiterima";
import SetoranDiulangi from "./HomeGuru/SetoranDiulangi";
import HalamanDiterima from "./HomeSiswa/HalamanDiterima";
import HalamanDiulangi from "./HomeSiswa/HalamanDiulangi";
import Layout from "./HomeGuru/Layout";
import LayoutAdmin from "./HomeAdmin/LayoutAdmin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/guru" element={<GuruLogin />} />
          <Route path="/register-guru" element={<RegisterGuru />} />
          <Route path="/siswa" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/file" element={<FileUpload />} />

          <Route
            path="/feedback-siswa"
            element={
              <PrivateRoute>
                <FeedbackSiswa />
              </PrivateRoute>
            }
          />

          <Route
            path="/home/login"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/menu"
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/halaman-admin" element={<HalamanAdmin />} />
          <Route
            path="/setoran"
            element={
              <PrivateRoute>
                <QuranSetoranForm />
              </PrivateRoute>
            }
          />
          <Route path="/futureclass" element={<Hello />} />

          <Route path="/*" element={<NotFound />} />
          <Route
            path="/dataguru"
            element={
              <LayoutAdmin>
                <DataGuru />
              </LayoutAdmin>
            }
          />

          <Route
            path="/setoran/:kelas" // Tambahkan titik dua (:) untuk mendapatkan parameter kelas
            element={
              <LayoutAdmin>
                <Setoran />
              </LayoutAdmin>
            }
          />

          <Route
            path="/kelas/:kelas"
            element={
              <LayoutAdmin>
                <HalamanKelas />
              </LayoutAdmin>
            }
          />
          <Route path="/guru/login" element={<DashboardGuru />} />
          <Route
            path="/guru/kelas"
            element={
              <Layout>
                <HalamanGuru />
              </Layout>
            }
          />
          <Route path="/halaman-diterima" element={<HalamanDiterima />} />
          <Route path="/halaman-diulangi" element={<HalamanDiulangi />} />

          {/* HomeGuru */}
          <Route
            path="/setoran/:kelas" // Tambahkan titik dua (:) untuk mendapatkan parameter kelas
            element={
              <Layout>
                <Setoran />
              </Layout>
            }
          />
          <Route
            path="/setoran/diterima/:kelas" // Tambahkan titik dua (:) untuk mendapatkan parameter kelas
            element={
              <Layout>
                <SetoranDiterima />
              </Layout>
            }
          />
          <Route
            path="/setoran/diulangi/:kelas" // Tambahkan titik dua (:) untuk mendapatkan parameter kelas
            element={
              <Layout>
                <SetoranDiulangi />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
