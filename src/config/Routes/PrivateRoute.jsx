// PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Pastikan ini mengarah ke file AuthContext yang benar

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect pengguna ke halaman login jika mereka belum terautentikasi
    // Simpan lokasi saat ini untuk navigasi kembali setelah login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
