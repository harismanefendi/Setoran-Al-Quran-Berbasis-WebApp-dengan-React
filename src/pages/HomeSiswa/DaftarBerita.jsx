import React, { useState, useEffect } from "react";
import { db, ref } from "../../config/firebase/index";
import { onValue } from "firebase/database";

import { Link } from "react-router-dom";

const DaftarBerita = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articlesRef = ref(db, "articles/");

    // Menambahkan listener untuk mengambil data dari Firebase
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Mengubah data menjadi array dan mengatur state
        const articlesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setArticles(articlesArray);
      } else {
        console.log("Data artikel tidak ditemukan");
      }
    });

    // Tambahkan console.log untuk memeriksa saat komponen dimuat dan ketika data diperbarui
    console.log("Komponen DaftarBerita dimuat");

    return () => {
      // Tambahkan console.log untuk memeriksa saat komponen dibongkar
      console.log("Komponen DaftarBerita dibongkar");
    };
  }, []);

  // Tambahkan console.log untuk memeriksa saat rendering
  console.log("Rendering DaftarBerita");

  return (
    <div className="p-4">
      {articles.map((article) => (
        <div key={article.id} className="mb-4">
          <h2 className="text-xl font-bold">{article.title}</h2>
          <p>{article.preview}</p>
          <Link to={`/article/${article.id}`} className="text-blue-500">
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DaftarBerita;
