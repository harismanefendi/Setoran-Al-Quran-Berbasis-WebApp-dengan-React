import React from "react";
import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const AppNameStyled = styled.div`
  position: relative;
  font-size: 2.5em;
  color: #c0c0c0; /* Silver */
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: transparent; /* Menghapus background */
  overflow: hidden;

  .app-title,
  .app-subtitle {
    background: linear-gradient(90deg, #e6e6e6 25%, #333333 50%, #e6e6e6 75%);
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmerAnimation} 4s linear infinite;
    position: relative;
    z-index: 2;
  }

  .app-title {
    font-weight: bold;
    box-shadow: none; /* Menghapus shadow */
  }

  .app-subtitle {
    font-size: 0.5em;
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
