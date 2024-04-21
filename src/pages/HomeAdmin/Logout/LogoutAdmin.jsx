import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../../../config/Routes/AuthContext";

const LogoutAdmin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Asumsikan Anda memiliki fungsi logout di AuthContext Anda

  const handleLogout = async () => {
    try {
      await signOut(auth); // Melakukan proses sign out menggunakan Firebase Auth
      logout(); // Mengatur ulang status isAuthenticated menjadi false
      localStorage.removeItem("user"); // Menghapus data pengguna dari localStorage
      navigate("/"); // Mengarahkan pengguna ke halaman awal setelah logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return <button onClick={handleLogout}>logout</button>;
};

export default LogoutAdmin;
