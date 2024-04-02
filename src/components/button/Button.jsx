import React, { useState } from "react";

const AnimatedButton = ({ onClick, children }) => {
  const [rippleArray, setRippleArray] = useState([]);

  const addRipple = (event) => {
    const button = event.currentTarget;
    const newRipple = {
      x: event.clientX - button.getBoundingClientRect().left,
      y: event.clientY - button.getBoundingClientRect().top,
      size: button.offsetWidth,
    };
    // Menggunakan callback dalam setState
    setRippleArray((prevRipples) => [...prevRipples, newRipple]);
    setTimeout(() => {
      setRippleArray((prevRipples) => prevRipples.filter((r, i) => i !== 0));
    }, 400);
  };

  return (
    <button
      onClick={onClick} // Menggunakan event onClick
      className="relative overflow-hidden bg-greendark text-white font-medium py-2 px-4 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-blue-300 transition ease-out duration-300 transform hover:scale-110 flex items-center justify-center"
    >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => (
          <span
            key={"ripple_" + index}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              animation: "ripple 600ms linear",
            }}
          />
        ))}
      {children}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default AnimatedButton;
