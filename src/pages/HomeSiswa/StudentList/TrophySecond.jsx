import React from "react";
import medalSilver from "../../../assets/medalSilver.png"; // Corrected import statement

const TrophySecond = () => {
  return (
    <div className="relative font-sans">
      <img src={medalSilver} alt="Silver Medal" className="h-16 w-16" /> {/* Use the imported image as src */}
    </div>
  );
};

export default TrophySecond;
