import React, { useState } from "react";
import { storage } from "../config/firebase/index";
import { ref as firebaseRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function FileUpload({ onFileUpload, uploadProgress }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const fileStorageRef = firebaseRef(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(fileStorageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadProgress(progress);
      },
      (error) => {
        alert("Error in uploading file: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          onFileUpload(url);
          alert("File uploaded successfully!");
        });
      }
    );
  };

  return (
    <div className="flex items-center">
      <input type="file" onChange={handleChange} className="mb-2" />
      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
