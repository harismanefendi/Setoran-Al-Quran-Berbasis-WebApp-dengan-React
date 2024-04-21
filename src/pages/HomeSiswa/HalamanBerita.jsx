import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, ref } from "../../config/firebase/index";
import { onValue } from "firebase/database";

const HalamanBerita = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const articleRef = ref(db, `articles/${articleId}`);

    const unsubscribe = onValue(articleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setArticle(data);
      } else {
        setArticle(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500 font-medium">Artikel tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-800">{article.title}</h1>
      <div className="article-content text-gray-700 text-lg leading-relaxed space-y-4">
        {/* Pastikan untuk membersihkan dan memvalidasi HTML sebelum menggunakan dangerouslySetInnerHTML */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <div className="text-sm text-gray-500">Tanggal Pembuatan: {new Date(article.tanggal).toLocaleString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
      </div>
    </div>
  );
};

export default HalamanBerita;
