import React from "react";
import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const AppNameStyled = styled.div`
  position: relative;
  font-size: 2.5em;
  color: #042e33; /* Mengubah warna teks */
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: transparent; /* Menghapus background */
  overflow: hidden;

  .app-title {
    font-weight: bold;
    color: #042e33; /* Mengubah warna teks */
    box-shadow: none; /* Menghapus shadow */
    background: none; /* Menghapus background gradien */
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: inherit; /* Warna teks mengikuti warna umum */
    animation: ${shimmerAnimation} 8s linear infinite;
    position: relative;
    z-index: 2;
  }

  .app-subtitle {
    font-size: 0.6em;
    color: #042e33; /* Mengubah warna teks */
    background: none; /* Menghapus background gradien */
    -webkit-background-clip: text;
    -webkit-text-fill-color: inherit; /* Warna teks mengikuti warna umum */
    animation: none; /* Menghapus animasi */
  }

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const AppName = ({ children }) => (
  <AppNameStyled>
    <div className="app-title">{children}</div>
  </AppNameStyled>
);

export default AppName;
