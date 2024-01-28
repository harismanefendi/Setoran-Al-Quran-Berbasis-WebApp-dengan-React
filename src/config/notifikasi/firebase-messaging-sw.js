// Mengimpor skrip Firebase SDK dan Firebase Messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyBtp-Ev4oqWeeOk2daBjdV2f5ANJTxViVQ",
  authDomain: "setoran-online.firebaseapp.com",
  projectId: "setoran-online",
  storageBucket: "setoran-online.appspot.com",
  messagingSenderId: "897721515379",
  appId: "1:897721515379:web:be85658e692c7ecd18d906",
  measurementId: "G-TF40WP54CV",
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Inisialisasi Firebase Messaging
const messaging = firebase.messaging();

// Menangani pesan di latar belakang
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  // Menyesuaikan opsi notifikasi
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png", // URL ikon untuk notifikasi Anda
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
