import React from "react";

function Loading({ text }) {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-md animate-pulse">
      <h3 className="text-lg font-semibold mb-2">Loading {text}</h3>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="flex items-center mb-1">
        <div className="h-4 bg-gray-300 rounded w-1/4 mr-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/6"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  );
}

export default Loading;
