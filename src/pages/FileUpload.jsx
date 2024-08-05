import React, { useState } from "react";
import { storage } from "../config/firebase/index";
import { ref as firebaseRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function FileUpload({ onFileUpload, uploadProgress }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setIsUploading(true); // Set isUploading to true when upload starts

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
        setIsUploading(false); // Reset isUploading on error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          onFileUpload(url);
          alert("File uploaded successfully!");
          setIsUploading(false); // Reset isUploading after upload completes
        });
      }
    );
  };

  return (
    <div className="flex items-center">
      <input type="file" onChange={handleChange} className="mb-2" />
      <button onClick={handleUpload} disabled={isUploading} className={`bg-${isUploading ? "gray-300" : "blue-500"} hover:bg-${isUploading ? "gray-400" : "blue-700"} text-white font-bold py-2 px-4 rounded-lg`}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default FileUpload;
