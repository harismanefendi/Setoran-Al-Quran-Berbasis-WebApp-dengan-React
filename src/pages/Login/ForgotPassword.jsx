import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Silakan masukkan email Anda.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Link reset kata sandi telah dikirimkan ke email Anda. Silakan cek inbox Anda.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Tidak ada pengguna yang terdaftar dengan email ini.");
      } else {
        setError("Terjadi kesalahan saat mengirim email reset kata sandi. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Lupa Kata Sandi</h2>
        {message && <p className="bg-green-100 text-green-800 p-3 my-2">{message}</p>}
        {error && <p className="bg-red-100 text-red-800 p-3 my-2">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Kirim Link Reset Kata Sandi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
