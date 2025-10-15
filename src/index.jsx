import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { SharedProvider } from "./contexts/SharedContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SharedProvider>
        <App />
      </SharedProvider>
    </BrowserRouter>
  </React.StrictMode>
);
