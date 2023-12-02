// Contoh menggunakan JavaScript
const database = firebase.database();
const usersRef = database.ref("users");

// Misalkan kita punya data pengguna dari hasil autentikasi (contoh: email dan UID)
const userData = {
  email: user.email,
  uid: user.uid,
  // Informasi tambahan lainnya bisa ditambahkan sesuai kebutuhan
};

// Simpan data pengguna ke Realtime Database
usersRef.child(user.uid).set(userData);
