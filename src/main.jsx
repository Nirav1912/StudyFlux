import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { AuthProvider } from "./context/AuthContext";
import { PYQProvider } from "./context/PYQContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <PYQProvider>

      <AuthProvider>

        <App />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          theme="dark"
        />

      </AuthProvider>

    </PYQProvider>

  </React.StrictMode>
);