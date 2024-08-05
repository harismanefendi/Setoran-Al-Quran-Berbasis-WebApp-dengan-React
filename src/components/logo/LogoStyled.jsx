import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../../assets/bitmap.svg"; // Pastikan jalur ini sesuai dengan lokasi file logo

// Animasi shimmer dari kiri atas ke kanan bawah
const shimmerAnimation = keyframes`
  0% { transform: translate(-100%, -100%) rotate(45deg); }
  100% { transform: translate(100%, 100%) rotate(45deg); }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0;
  margin: 0;
  overflow: hidden;

  .logo-wrapper {
    position: relative;
    display: inline-block;
  }

  .logo-img {
    width: 18rem; /* Ukuran gambar logo */
    margin: 0;
    display: block;
  }

  .shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 45%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 55%);
    transform: rotate(45deg);
    animation: ${shimmerAnimation} 12s linear infinite;
    z-index: 1;
    pointer-events: none;
  }

  .shimmer-delay1 {
    animation-delay: 4s; /* Penundaan waktu mulai */
  }

  .shimmer-delay2 {
    animation-delay: 8s; /* Penundaan waktu mulai kedua */
  }
`;

const Logo = () => (
  <LogoContainer>
    <div className="logo-wrapper">
      <img className="logo-img" src={logo} alt="Logo" />
      <div className="shimmer" />
    </div>
  </LogoContainer>
);

export default Logo;
