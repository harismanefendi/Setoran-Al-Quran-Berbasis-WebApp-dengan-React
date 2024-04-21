import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, ref } from "../../../config/firebase/index";
import { onValue, remove } from "firebase/database";

const Edit = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articlesRef = ref(db, "articles/");

    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const articlesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setArticles(articlesArray);
      }
    });
  }, []);

  const handleDelete = (id) => {
    remove(ref(db, `articles/${id}`))
      .then(() => {
        console.log("Berita berhasil dihapus");
      })
      .catch((error) => {
        console.error("Error menghapus berita:", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
              <div className="flex space-x-2">
                <Link to={`/edit-article/${article.id}`} className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                  Edit
                </Link>
                <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:text-red-600 transition-colors duration-300">
                  Hapus
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{article.preview}</p>
            <div className="text-sm text-gray-500">Tanggal Pembuatan: {new Date(article.tanggal).toLocaleString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">Tidak ada berita yang ditemukan.</div>
      )}
    </div>
  );
};

export default Edit;
