import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase";
import { useAuth } from "../../config/Routes/AuthContext";
import ButtonSpinner from "../../components/buttonspinner/ButtonSpinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true); // State baru
  const navigate = useNavigate();
  const { login } = useAuth(); // Gunakan useAuth

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Mengganti titik di email dengan koma
      const emailKey = user.email.replace(/\./g, ",");

      // Mengambil data pengguna dari Firebase Database
      const userRef = ref(db, `siswa/${emailKey}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            localStorage.setItem("user", JSON.stringify(userData));
            login(); // Mengatur status isAuthenticated menjadi true
            navigate("/home/login"); // Arahkan ke halaman home
          } else {
            // Pengguna tidak ditemukan di tabel siswa
            alert("Anda belum terdaftar sebagai siswa. Silakan registrasi terlebih dahulu.");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching user data:", error);
        });
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
      if (error.code === "auth/user-not-found") {
        alert("Email atau password salah. Silakan coba lagi.");
      } else {
        alert("Email atau password salah. Silakan coba lagi.");
        setShowSpinner(false); // Atur showSpinner menjadi false
      }
    }
  };

  return (
    <div className="font-body min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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

          <div className="">
            <ButtonSpinner buttonText={"Sign in"} isLoading={isLoading && showSpinner} /> {/* Memperbarui kondisi */}
          </div>
          <div className="text-center">
            <button type="button" onClick={() => navigate("/forgot-password")} className="mt-0 px-2 text-indigo-600 hover:underline focus:outline-none">
              Lupa Sandi?
            </button>
            <button type="button" onClick={() => navigate("/delete")} className="mt-0 text-indigo-600 hover:underline focus:outline-none">
              Hapus Akun?
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <button type="button" onClick={() => navigate("/register")} className="text-indigo-600 hover:underline focus:outline-none">
              Register now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
