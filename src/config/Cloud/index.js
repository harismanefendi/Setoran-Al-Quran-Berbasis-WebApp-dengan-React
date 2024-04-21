const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // Ganti dengan alamat email Anda
    pass: "your-email-password", // Ganti dengan kata sandi email Anda
  },
});

exports.sendApprovalEmail = functions.database.ref("/guru/{uid}").onUpdate((change, context) => {
  const updatedData = change.after.val();
  const previousData = change.before.val();

  if (updatedData.approved && !previousData.approved) {
    const { email, name } = updatedData;

    const mailOptions = {
      from: "your-email@gmail.com", // Alamat email pengirim
      to: email, // Alamat email guru yang bersangkutan
      subject: "Pendaftaran Disetujui",
      text: `Halo ${name},\n\nPendaftaran Anda sebagai guru telah disetujui. Anda sekarang dapat mengakses fitur-fitur yang disediakan. Terima kasih!\n\nSalam,\nTim Admin`,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }

  return null;
});
