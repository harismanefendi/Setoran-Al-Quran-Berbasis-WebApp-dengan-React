import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../config/Routes/AuthContext"; // Import AuthProvider
import PrivateRoute from "../config/Routes/PrivateRoute"; // Import PrivateRoute

import Home from "./HomeSiswa/Home";
import AdminLogin from "./Login/AdminLogin";
import GuruLogin from "./Login/GuruLogin";
import Login from "./Login/Login";
import Menu from "./Menu";
import UserProfile from "./UserProfil";
import NotFound from "./NotFound";
import Register from "./Register/Register";
import QuranSetoranForm from "./QuranSetoranForm";
import Hello from "./Hello";
import AdminPage from "./HomeAdmin/AdminPage";
import HalamanGuru from "./HomeGuru/HalamanGuru";
import HomePage from "./Dashboard/homePage";
import EditProfile from "./EditProfil";
import RegisterAdmin from "./Register/RegisterAdmin";
import RegisterGuru from "./Register/RegisterGuru";
import FileUpload from "./FileUpload";
import FeedbackSiswa from "./HomeSiswa/FeedbackSiswa";
import HalamanAdmin from "./HomeAdmin/HalamanAdmin";
import PanelSiswa from "./HomeAdmin/PanelSiswa";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Menggunakan AuthProvider */}
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

          {/* Rute yang memerlukan autentikasi */}
          <Route
            path="guru/login"
            element={
              <PrivateRoute>
                <HalamanGuru />
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
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/halaman-admin"
            element={
              <PrivateRoute>
                <HalamanAdmin />
              </PrivateRoute>
            }
          />

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
          <Route path="/halaman-admin/panel-admin" element={<AdminPage />} />
          <Route path="/halaman-admin/panel-siswa" element={<PanelSiswa />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
