import React from "react";
import styled, { keyframes } from "styled-components";

const breathingAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  25% { transform: scale(1.05); opacity: 0.85; }
  50% { transform: scale(1.1); opacity: 1; }
  75% { transform: scale(1.05); opacity: 0.85; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const AppNameStyled = styled.div`
  // Mengubah ini dari h1 ke div untuk fleksibilitas
  font-size: 2.5em;
  color: #ffffff;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform-origin: center;
  user-select: none;

  .app-title,
  .app-subtitle {
    // Styling untuk judul dan subjudul
    background: linear-gradient(90deg, #e6e6e6 25%, #ffffff 50%, #e6e6e6 75%);
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmerAnimation} 2s linear infinite, ${breathingAnimation} 6s ease-in-out infinite;
  }

  .app-title {
    font-weight: bold;
  }

  .app-subtitle {
    font-size: 0.5em; // Ukuran lebih kecil untuk subjudul
  }

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const AppName = ({ children }) => <AppNameStyled>{children}</AppNameStyled>;

export default AppName;
