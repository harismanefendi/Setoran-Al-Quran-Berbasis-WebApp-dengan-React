// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase, child, ref, push as firebasePush, set as firebaseSet } from "firebase/database";
// import { getStorage } from "firebase/storage"; // Import untuk Firebase Storage

// const firebaseConfig = {
//   apiKey: "AIzaSyBtp-Ev4oqWeeOk2daBjdV2f5ANJTxViVQ",
//   authDomain: "setoran-online.firebaseapp.com",
//   databaseURL: "https://setoran-online-default-rtdb.firebaseio.com/",
//   projectId: "setoran-online",
//   storageBucket: "setoran-online.appspot.com",
//   messagingSenderId: "897721515379",
//   appId: "1:897721515379:web:be85658e692c7ecd18d906",
//   measurementId: "G-TF40WP54CV",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getDatabase(app);
// const storage = getStorage(app); // Inisialisasi Firebase Storage

// const push = (dataRef, dataToPush) => {
//   return firebasePush(dataRef, dataToPush);
// };

// const set = (dataRef, dataToSet) => {
//   return firebaseSet(dataRef, dataToSet);
// };

// export { auth, db, child, ref, push, set, storage }; // Eksport storage

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push as firebasePush, set as firebaseSet, remove as firebaseRemove, get } from "firebase/database"; // Menambahkan ekspor get
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtp-Ev4oqWeeOk2daBjdV2f5ANJTxViVQ",
  authDomain: "setoran-online.firebaseapp.com",
  databaseURL: "https://setoran-online-default-rtdb.firebaseio.com/",
  projectId: "setoran-online",
  storageBucket: "setoran-online.appspot.com",
  messagingSenderId: "897721515379",
  appId: "1:897721515379:web:be85658e692c7ecd18d906",
  measurementId: "G-TF40WP54CV",
};

// Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);

// Mendapatkan instance auth, database, storage, dan messaging
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

// Fungsi push untuk menambahkan data
const push = (dataRef, dataToPush) => {
  return firebasePush(dataRef, dataToPush);
};

// Fungsi set untuk mengatur data
const set = (dataRef, dataToSet) => {
  return firebaseSet(dataRef, dataToSet);
};

// Fungsi remove untuk menghapus data
const remove = (dataRef) => {
  return firebaseRemove(dataRef);
};

// Export semua instance dan fungsi yang diperlukan
export { app, auth, db, ref, push, set, remove, storage, messaging, get }; // Menambahkan get ke dalam ekspor
