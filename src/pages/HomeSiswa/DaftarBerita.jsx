import React, { useState, useEffect } from "react";
import { db, ref } from "../../config/firebase/index";
import { onValue } from "firebase/database";
import { Link } from "react-router-dom";

const DaftarBerita = () => {
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

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.preview}</p>
            <Link to={`/article/${article.id}`} className="inline-block text-blue-500 hover:text-blue-600 transition-colors duration-300">
              Read more
            </Link>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No articles found.</div>
      )}
    </div>
  );
};

export default DaftarBerita;
