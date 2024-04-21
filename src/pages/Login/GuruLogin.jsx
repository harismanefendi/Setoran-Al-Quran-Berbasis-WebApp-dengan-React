import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase";
import { useAuth } from "../../config/Routes/AuthContext";

function GuruLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const emailKey = user.email.replace(/\./g, ",");
      const userRef = ref(db, `guru/${emailKey}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.approved) {
              localStorage.setItem("user", JSON.stringify(userData));
              login();
              navigate("/profile-guru");
            } else {
              alert("Akun Anda belum disetujui oleh admin. Harap tunggu persetujuan admin sebelum login.");
            }
          } else {
            alert("Anda belum terdaftar sebagai guru. Silakan registrasi terlebih dahulu.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } catch (error) {
      console.error("Error:", error.message);
      if (error.code === "auth/user-not-found") {
        alert("Email atau password salah. Silakan coba lagi.");
      } else {
        alert("Terjadi kesalahan saat mencoba login.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
          <div className="text-center">
            <button type="button" onClick={() => navigate("/forgot-password")} className="mt-0 text-indigo-600 hover:underline focus:outline-none">
              Lupa Sandi?
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <button type="button" onClick={() => navigate("/register-guru")} className="text-indigo-600 hover:underline focus:outline-none">
              Register now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GuruLogin;
