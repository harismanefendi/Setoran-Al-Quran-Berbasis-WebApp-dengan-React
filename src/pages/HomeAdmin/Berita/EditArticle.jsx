import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, ref, get, set as firebaseSet } from "../../../config/firebase/index";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditArticle = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tanggal, setTanggal] = useState(""); // Add tanggal state

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = ref(db, `articles/${id}`);
        const articleSnapshot = await get(articleRef);
        if (articleSnapshot.exists()) {
          const articleData = articleSnapshot.val();
          setTitle(articleData.title);
          setContent(articleData.content);
          setTanggal(articleData.tanggal || ""); // Set updatedAt value (if exists)
        } else {
          console.log("Artikel tidak ditemukan");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const editedArticle = { title, content, tanggal: new Date().toISOString() }; // Include tanggal in editedArticle
    try {
      const articleRef = ref(db, `articles/${id}`);
      await firebaseSet(articleRef, editedArticle);
      console.log("Artikel berhasil diupdate");
      window.location.href = `/edit`; // Redirect ke halaman edit setelah berhasil mengupdate
    } catch (error) {
      console.error("Gagal mengupdate artikel:", error);
    }
  };

  return (
    <form onSubmit={handleEdit} className="p-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mb-4" placeholder="Judul Artikel" />
      <ReactQuill value={content} onChange={setContent} className="mb-4" />
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Update Artikel
      </button>
    </form>
  );
};

export default EditArticle;
