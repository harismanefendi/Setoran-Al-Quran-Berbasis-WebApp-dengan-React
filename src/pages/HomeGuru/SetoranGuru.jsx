import React, { useState, useEffect } from "react";
import { ref as dbRef, db, set, get } from "../../config/firebase/index"; // Import get function
import { onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import FeedbackPopup from "./Popup/FeedbackPopup";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

const SetoranGuru = () => {
  const [setoranList, setSetoranList] = useState([]);
  const [selectedSetoran, setSelectedSetoran] = useState(null);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [namaUstadz, setNamaUstadz] = useState("");
  const { kelas } = useParams();

  // Assuming the logged-in user's email is available via some auth context or similar
  const loggedInEmail = "12050310375@students.uin-suska.ac.id";

  useEffect(() => {
    const setoranRef = dbRef(db, "setoran");
    onValue(setoranRef, (snapshot) => {
      let setoranArray = [];
      const data = snapshot.val();
      if (data) {
        for (const email in data) {
          for (const id in data[email]) {
            const setoran = data[email][id];
            if (setoran.kelas === kelas && setoran.status === "belum diperiksa") {
              setoranArray.push({
                id,
                emailKey: email,
                ...setoran,
              });
            }
          }
        }
        setSetoranList(setoranArray);
      }
    });

    const guruRef = dbRef(db, `guru/${loggedInEmail.replace(/\./g, ",")}`);
    get(guruRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setNamaUstadz(data.namaUstadz);
        }
      })
      .catch((error) => {
        console.error("Error fetching namaUstadz:", error);
      });
  }, [kelas, loggedInEmail]);

  const updateStatus = (emailKey, idSetoran, newStatus, setoran, komentar = "") => {
    const setoranRef = dbRef(db, `setoran/${emailKey}/${idSetoran}`);
    set(setoranRef, { ...setoran, status: newStatus, komentar })
      .then(() => {
        console.log(`Status telah diupdate menjadi: ${newStatus}`);
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const handleFeedback = (emailKey, idSetoran, setoran) => {
    setSelectedSetoran({ emailKey, idSetoran, setoran });
    setShowFeedbackPopup(true);
  };

  const saveFeedback = (formData) => {
    const { emailKey, idSetoran } = selectedSetoran;
    const feedbackRef = dbRef(db, `feedbackSetoran/${emailKey}/${idSetoran}`);
    const feedbackData = {
      tajwid: formData.tajwid,
      komentar: formData.komentar,
      kelancaran: formData.kelancaran,
      rating: formData.rating,
      namaUstadz: formData.namaUstadz,
    };
    set(feedbackRef, feedbackData)
      .then(() => {
        console.log("Feedback berhasil disimpan");
        setSelectedSetoran(null);
        setShowFeedbackPopup(false);
      })
      .catch((error) => console.error("Error menyimpan feedback:", error));
  };

  const handleShow = () => {
    if (selectedSetoran) {
      setShowFeedbackPopup(true);
    }
  };
  const handleAccept = () => {
    if (selectedSetoran) {
      const { emailKey, idSetoran, setoran } = selectedSetoran;
      updateStatus(emailKey, idSetoran, "Diterima", setoran);
    }
  };

  const handleRetry = () => {
    const komentar = prompt("Masukkan komentar untuk setoran yang diulangi:");
    if (komentar) {
      if (selectedSetoran) {
        const { emailKey, idSetoran, setoran } = selectedSetoran;
        updateStatus(emailKey, idSetoran, "Diulangi", setoran, komentar);
      }
    } else {
      alert("Komentar harus diisi untuk setoran yang diulangi.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Daftar Setoran Siswa Kelas {kelas}</h1>
      {setoranList.map((setoran) => (
        <div key={setoran.id} className="bg-white rounded-lg shadow-md mb-6 p-4">
          <p className="text-lg font-semibold text-gray-800 mb-2">Nama: {setoran.namaPeserta}</p>
          <p className="text-gray-600 mb-2">Juz: {setoran.juz}</p>
          <p className="text-gray-600 mb-2">Input Value: {setoran.inputValue}</p>
          <p className="text-gray-600 mb-2">
            Surat: {setoran.suratAwal} ayat {setoran.ayatAwal} sampai {setoran.suratAkhir} ayat {setoran.ayatAkhir}
          </p>
          <p className="text-gray-600 mb-2">Status: {setoran.status}</p>
          <p className="text-gray-600 mb-2">Tanggal Upload: {new Date(setoran.tanggal).toLocaleDateString()}</p>
          <div className="my-3 flex justify-center">
            <video width="320" height="240" controls className="rounded-lg shadow-md">
              <source src={setoran.uploadedFileUrl} type="video/mp4" />
            </video>
          </div>
          <div className="text-center">
            <Popover showArrow={true} placement="bottom">
              <PopoverTrigger>
                <Button onClick={() => handleFeedback(setoran.emailKey, setoran.id, setoran)}>Beri Feedback</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-4">
                  <p>Apakah setoran diterima atau diulangi?</p>
                  <div className="flex justify-between mt-4">
                    <Popover showArrow={true} placement="bottom">
                      <PopoverTrigger>
                        <Button onClick={handleShow}>Diterima</Button>
                      </PopoverTrigger>
                      <PopoverContent>{showFeedbackPopup && <FeedbackPopup isVisible={showFeedbackPopup} onAccept={handleAccept} onSubmit={saveFeedback} namaUstadz={namaUstadz} />}</PopoverContent>
                    </Popover>
                    <Button onClick={handleRetry}>Diulangi</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SetoranGuru;
