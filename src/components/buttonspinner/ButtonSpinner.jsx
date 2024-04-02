import React from "react";

export default function ButtonSpinner({ buttonText, isLoading }) {
  return (
    <button
      type="submit"
      className={`text-center w-full py-2 px-4 justify-center flex border text-sm font-medium rounded-md text-white bg-hijaukalam hover:bg-hijautarang focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 ${
        isLoading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <svg className="animate-spin mx-2" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path
              d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
              stroke="#ffffff"
              stroke-width="3.55556"
              stroke-linecap="round"
            />
          </g>
        </svg>
      ) : null}
      {isLoading ? "Processing..." : buttonText}
    </button>
  );
}
