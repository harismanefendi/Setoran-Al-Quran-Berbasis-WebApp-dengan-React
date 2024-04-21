// Layout.jsx
import NavbarAdmin from "./NavbarAdmin";

const LayoutAdmin = ({ children }) => {
  return (
    <div>
      <NavbarAdmin />
      {children}
    </div>
  );
};

export default LayoutAdmin;
