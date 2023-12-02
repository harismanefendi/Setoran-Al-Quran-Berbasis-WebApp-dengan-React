import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Jika user terautentikasi, simpan informasi yang dibutuhkan
        setCurrentUser({
          isAuthenticated: true,
          user: {
            email: user.email,
            uid: user.uid,
            // Anda bisa menambahkan informasi lain yang dibutuhkan dari objek user
          },
        });
      } else {
        // Jika tidak ada user yang terautentikasi
        setCurrentUser({
          isAuthenticated: false,
          user: null,
        });
      }
    });

    return unsubscribe; // Unsubscribe pada unmount
  }, []);

  return currentUser;
};

export default useAuth;
