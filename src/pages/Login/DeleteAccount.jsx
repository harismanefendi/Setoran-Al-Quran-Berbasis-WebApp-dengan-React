import { useState } from "react";
import { auth } from "../../config/firebase";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth"; // Tambahkan impor signInWithEmailAndPassword

const DeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Silakan masukkan email dan password Anda.");
      return;
    }

    try {
      // Verifikasi email dan password sebelum menghapus akun
      await signInWithEmailAndPassword(auth, email, password); // Perbaiki panggilan fungsi signInWithEmailAndPassword

      // Dapatkan referensi pengguna yang sedang login
      const user = auth.currentUser;

      if (user) {
        // Hapus akun pengguna
        await deleteUser(user);

        // Reset email dan password
        setEmail("");
        setPassword("");

        // Tampilkan pesan sukses
        setMessage("Akun Anda telah berhasil dihapus.");
      } else {
        setError("User tidak ditemukan.");
        console.log("User tidak ditemukan.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat menghapus akun. Silakan coba lagi.");
      console.log("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Hapus Akun</h2>
        {message && <p className="bg-green-100 text-green-800 p-3 my-2">{message}</p>}
        {error && <p className="bg-red-100 text-red-800 p-3 my-2">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-3"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Hapus Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
