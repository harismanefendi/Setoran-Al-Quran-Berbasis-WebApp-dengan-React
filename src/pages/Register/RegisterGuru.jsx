import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase"; // Pastikan ini sesuai dengan struktur folder Anda
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const RegisterGuru = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value.includes("@")) {
      setEmailError("Email tidak valid");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password tidak cocok");
      return;
    } else {
      setConfirmPasswordError("");
    }

    validateEmail(email);

    if (!emailError && !passwordError && !confirmPasswordError) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userEmailKey = email.replace(/\./g, ","); // Mengganti titik dalam email dengan koma
          const userRef = ref(db, `guru/${userEmailKey}`);

          const userData = {
            email: email,
            name: name,
            kelas: "", // Isi dengan kelas jika ada
          };

          set(userRef, userData)
            .then(() => {
              console.log("User data added to Realtime Database");
              navigate("/"); // Navigasi ke halaman utama atau login setelah pendaftaran berhasil
            })
            .catch((error) => {
              console.error("Error saving user data:", error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === "auth/email-already-in-use") {
            window.alert("Email sudah terdaftar. Silakan login atau gunakan email lain.");
          } else {
            console.error("Error:", errorCode, errorMessage);
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Register</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Nama */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-1 p-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 p-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  emailError ? "border-red-500" : ""
                }`}
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              {emailError && <p className="mt-2 text-sm text-red-500">{emailError}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength="6"
                className={`mt-1 p-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  passwordError ? "border-red-500" : ""
                }`}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length < 6) {
                    setPasswordError("Password terlalu pendek");
                  } else {
                    setPasswordError("");
                  }
                }}
              />
              {passwordError && <p className="mt-2 text-sm text-red-500">{passwordError}</p>}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 p-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  confirmPasswordError ? "border-red-500" : ""
                }`}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (e.target.value !== password) {
                    setConfirmPasswordError("Password tidak cocok");
                  } else {
                    setConfirmPasswordError("");
                  }
                }}
              />
              {confirmPasswordError && <p className="mt-2 text-sm text-red-500">{confirmPasswordError}</p>}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterGuru;
