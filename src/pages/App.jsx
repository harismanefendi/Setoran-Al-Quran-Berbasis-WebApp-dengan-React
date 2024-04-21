import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../config/Routes/AuthContext"; // Import AuthProvider
import PrivateRoute from "../config/Routes/PrivateRoute"; // Import PrivateRoute
import { useEffect } from "react";
// Impor lainnya...

import Home from "./HomeSiswa/Home";
import AdminLogin from "./Login/AdminLogin";
import GuruLogin from "./Login/GuruLogin";
import Login from "./Login/Login";
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
import SetoranGuru from "./HomeGuru/SetoranGuru";
import ProfileGuru from "./HomeGuru/ProfileGuru";
import EditProfileGuru from "./HomeGuru/EditProfileGuru";
import HalamanBerita from "./HomeSiswa/HalamanBerita";
import BeritaAdmin from "./HomeAdmin/Berita/BeritaAdmin";
import DaftarBerita from "./HomeSiswa/DaftarBerita";
import { requestFirebaseNotificationPermission } from "../config/notifikasi/firebaseNotification";
import StudentList from "./HomeSiswa/StudentList/StudentList";
import ForgotPassword from "./Login/ForgotPassword";
import Testing from "./Testing";
import Riwayat from "./HomeSiswa/Riwayat";
import RiwayatAll from "./HomeGuru/RiwayatAll";
import ProfileAdmin from "./HomeAdmin/profile/ProfileAdmin";
import EditProfileAdmin from "./HomeAdmin/profile/EditProfileAdmin";
import LogoutGuru from "./HomeGuru/Logout/LogoutGuru";
import Persetujuan from "./HomeAdmin/Persetujuan/PersetujuanGuru";
import DeleteAccount from "./Login/DeleteAccount";
import EditBerita from "./HomeAdmin/Berita/EditBerita";
import Edit from "./HomeAdmin/Berita/Edit";
import EditArticle from "./HomeAdmin/Berita/EditArticle";
import ApprovalPageSiswa from "./HomeAdmin/Persetujuan/PersetujuanSiswa";
import NavbarAdmin from "./HomeAdmin/NavbarAdmin";

function App() {
  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then((firebaseToken) => {
        // Lakukan sesuatu dengan token, seperti mengirim ke server
        console.log(firebaseToken);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/navbar-admin" element={<NavbarAdmin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/guru" element={<GuruLogin />} />
          <Route path="/register-guru" element={<RegisterGuru />} />
          <Route path="/siswa" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/file" element={<FileUpload />} />
          <Route path="/feedback-siswa" element={<FeedbackSiswa />} />
          <Route path="/riwayat" element={<Riwayat />} />

          <Route path="/home/login" element={<Home />} />

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
          <Route path="/hafiz-rank" element={<StudentList />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
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
            path="/riwayat/:kelas"
            element={
              <Layout>
                <RiwayatAll />
              </Layout>
            }
          />

          <Route
            path="/setoran/guru/:kelas" // Tambahkan titik dua (:) untuk mendapatkan parameter kelas
            element={
              <Layout>
                <SetoranGuru />
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
          <Route
            path="/profile-guru" // Tambahkan titik dua (:) untuk mendapatkan parameter kelas
            element={
              <Layout>
                <ProfileGuru />
              </Layout>
            }
          />
          <Route
            path="/edit-profile-guru" // Tambahkan titik dua (:) untuk mendapatkan parameter kelas
            element={
              <Layout>
                <EditProfileGuru />
              </Layout>
            }
          />

          <Route
            path="/logout-guru" // Tambahkan titik dua (:) untuk mendapatkan parameter kelas
            element={
              <Layout>
                <LogoutGuru />
              </Layout>
            }
          />
          {/* halaman Berita */}
          <Route path="/info-terkini" element={<DaftarBerita />} />
          <Route path="/article/:articleId" element={<HalamanBerita />} />

          {/* Berita Admin */}
          <Route path="/berita-admin" element={<BeritaAdmin />} />
          <Route path="/edit-berita" element={<EditBerita />} />
          <Route
            path="/edit"
            element={
              <LayoutAdmin>
                <Edit />
              </LayoutAdmin>
            }
          />
          <Route path="/edit-article/:id" element={<EditArticle />} />
          <Route path="/testing" element={<Testing />} />
          <Route
            path="/profile-admin"
            element={
              <LayoutAdmin>
                <ProfileAdmin />
              </LayoutAdmin>
            }
          />
          <Route path="/edit-profile-admin" element={<EditProfileAdmin />} />
          <Route path="/persetujuan-guru" element={<Persetujuan />} />
          <Route path="/persetujuan-siswa" element={<ApprovalPageSiswa />} />
          <Route path="/delete" element={<DeleteAccount />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
