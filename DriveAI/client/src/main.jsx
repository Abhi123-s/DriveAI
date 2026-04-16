/**
 * main.jsx — React application entry point
 *
 * Creates the React root and renders the App into #root (index.html)
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Global styles + Tailwind
import App from "./App.jsx";

// Mount the app into the <div id="root"> in index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
