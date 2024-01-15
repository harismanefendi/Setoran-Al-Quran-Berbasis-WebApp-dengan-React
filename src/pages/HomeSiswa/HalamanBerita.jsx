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
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!article) {
    return <p className="text-center text-lg text-red-500">Artikel tidak ditemukan.</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">{article.title}</h1>
      <div className="article-content text-gray-700 text-lg leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
};

export default HalamanBerita;
