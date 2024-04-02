import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import "./output.css";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);
