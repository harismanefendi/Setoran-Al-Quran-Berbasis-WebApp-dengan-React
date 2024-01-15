import React, { useState } from "react";
import { db, ref, push as firebasePush } from "../../../config/firebase/index";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BeritaAdmin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = { title, content };
    try {
      const articleRef = ref(db, "articles/"); // Specify the Firebase reference
      await firebasePush(articleRef, newArticle); // Use firebasePush to add data to Firebase
      console.log("Artikel berhasil dikirim ke Firebase");
      // Reset form fields or provide feedback to the user
      setTitle(""); // Clear the title field
      setContent(""); // Clear the content field
    } catch (error) {
      console.error("Gagal mengirim artikel ke Firebase", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mb-4" placeholder="Judul Artikel" />
      <ReactQuill value={content} onChange={setContent} className="mb-4" />
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Submit Artikel
      </button>
    </form>
  );
};

export default BeritaAdmin;
