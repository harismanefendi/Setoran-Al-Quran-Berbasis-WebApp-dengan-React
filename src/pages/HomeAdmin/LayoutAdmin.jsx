// Layout.jsx
import React from "react";
import HalamanAdmin from "./HalamanAdmin";

const LayoutAdmin = ({ children }) => {
  return (
    <div>
      <HalamanAdmin />
      {children}
    </div>
  );
};

export default LayoutAdmin;
