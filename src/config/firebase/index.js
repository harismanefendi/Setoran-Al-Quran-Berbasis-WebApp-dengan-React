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
import { getDatabase, child, ref, push as firebasePush, set as firebaseSet } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app); // Inisialisasi Firebase Storage
const messaging = getMessaging(app); // Inisialisasi Firebase Messaging

const push = (dataRef, dataToPush) => {
  return firebasePush(dataRef, dataToPush);
};

const set = (dataRef, dataToSet) => {
  return firebaseSet(dataRef, dataToSet);
};

export { app, auth, db, child, ref, push, set, storage, messaging }; // Eksport storage
