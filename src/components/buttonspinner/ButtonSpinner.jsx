import React from "react";

export default function ButtonSpinner({ buttonText, isLoading }) {
  return (
    <button
      type="submit"
      className={`w-full py-2 px-4 flex items-center justify-center text-sm font-medium rounded-md text-white bg-biru focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 ${
        isLoading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      ) : null}
      {isLoading ? "Processing..." : buttonText}
    </button>
  );
}
