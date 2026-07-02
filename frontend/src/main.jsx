import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#ffffff",
          color: "#0f172a",
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        },
        success: {
          style: {
            borderLeft: "5px solid #10B981",
          },
        },
        error: {
          style: {
            borderLeft: "5px solid #EF4444",
          },
        },
      }}
    />
    <App />
  </BrowserRouter>
);