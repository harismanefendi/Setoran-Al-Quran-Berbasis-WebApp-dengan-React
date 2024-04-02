import { useNavigate, useLocation } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="border pt-2 pb-2 pr-3 pl-3 rounded-2xl bg-greendark max-w-md mx-auto flex justify-between items-center px-4 space-x-2">
      <button
        className={`flex flex-col items-center text-xs text-gray-400 hover:text-white transition-colors ${location.pathname === "/home/login" ? "text-white" : ""}`}
        onClick={() => navigate("/home/login", { state: { userEmail: "email_siswa_di_sini" } })}
      >
        <svg width="24" height="24" viewBox="0 0 15 15" fill={location.pathname === "/home/login" ? "white" : "currentColor"} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
            fillRule="evenodd"
            clipRule="evenodd"
            style={{ fontWeight: location.pathname === "/home/login" ? "bold" : "normal" }}
          ></path>
        </svg>
        <span style={{ color: location.pathname === "/home/login" ? "white" : "currentColor" }}>Home</span>
      </button>

      <button
        className={`flex flex-col items-center text-xs text-gray-400 hover:text-white transition-colors ${location.pathname === "/feedback-siswa" ? "text-white" : ""}`}
        onClick={() => navigate("/feedback-siswa", { state: { userEmail: "email_siswa_di_sini" } })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" stroke={location.pathname === "/feedback-siswa" ? "white" : "currentColor"} />
        </svg>
        <span style={{ color: location.pathname === "/feedback-siswa" ? "white" : "currentColor" }}>Feedback</span>
      </button>
      <button
        className={`flex flex-col items-center text-xs text-gray-400 hover:text-white transition-colors ${location.pathname === "/halaman-diterima" ? "text-hijaukalam" : ""}`}
        onClick={() => navigate("/halaman-diterima", { state: { userEmail: "email_siswa_di_sini" } })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke={location.pathname === "/halaman-diterima" ? "white" : "currentColor"} />
        </svg>
        <span style={{ color: location.pathname === "/halaman-diterima" ? "white" : "currentColor" }}>Diterima</span>
      </button>
      <button
        className={`flex flex-col items-center text-xs text-gray-400 hover:text-white transition-colors ${location.pathname === "/halaman-diulangi" ? "text-hijaukalam" : ""}`}
        onClick={() => navigate("/halaman-diulangi", { state: { userEmail: "email_siswa_di_sini" } })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l-2 2-2-2v13h10V6l-2 2-2-2v13z" stroke={location.pathname === "/halaman-diulangi" ? "white" : "currentColor"} />
        </svg>
        <span style={{ color: location.pathname === "/halaman-diulangi" ? "white" : "currentColor" }}>Diulangi</span>
      </button>
      <button className="flex flex-col items-center text-xs text-gray-400 hover:text-white transition-colors" onClick={() => navigate("/user-profile")}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        <span style={{ color: location.pathname === "/user-profile" ? "white" : "currentColor" }}>Profil</span>
      </button>
    </div>
  );
}

export default NavigationBar;
