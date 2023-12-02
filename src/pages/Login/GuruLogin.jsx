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
  const { login } = useAuth(); // Gunakan useAuth

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Mengambil data pengguna dari Firebase Database
      const emailKey = user.email.replace(".", ","); // Ganti titik di email dengan koma
      const userRef = ref(db, `guru/${emailKey}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            localStorage.setItem("user", JSON.stringify(userData));
            login(); // Memanggil fungsi login untuk mengatur status isAuthenticated menjadi true
            navigate("/guru/login"); // Arahkan ke halaman home
          } else {
            console.log("No user data available");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        window.alert("Akun belum terdaftar. Silakan registrasi terlebih dahulu.");
      } else {
        console.error("Error:", error.message);
        window.alert("Email atau password salah. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Login <br /> Saja kita liat aja nanti
        </h2>
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

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
            >
              Sign in
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
