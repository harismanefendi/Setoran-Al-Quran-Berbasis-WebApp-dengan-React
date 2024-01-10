// Layout.jsx
import React from "react";
import DashboardGuru from "./DashboardGuru"; // Komponen navigasi tetap

const Layout = ({ children }) => {
  return (
    <div>
      <DashboardGuru />
      {children}
    </div>
  );
};

export default Layout;
