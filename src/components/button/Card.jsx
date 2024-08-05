import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, icon, onClick }) => {
  return (
    <div className="bg-white rounded-2xl flex-col shadow-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-xl transition-shadow duration-300 w-40 h-40" onClick={onClick}>
      <div className="bg-krem rounded-2xl w-full h-full flex items-center justify-center overflow-hidden">
        <img src={icon} className="w-3/4 h-3/4 object-contain hover:animate-appearance-in" alt={title} />
      </div>
      <div className="flex items-center mt-2">
        <div className="text-base font-sans font-medium">{title}</div>
      </div>
    </div>
  );
};

export default Card;
