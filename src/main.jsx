import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles.css";

import { WorkingHoursProvider } from "./context/WorkingHoursProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkingHoursProvider>
        <App />
      </WorkingHoursProvider>
    </BrowserRouter>
  </React.StrictMode>
);