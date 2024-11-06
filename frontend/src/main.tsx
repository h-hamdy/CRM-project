import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClientsProvider } from "./context/ClientsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClientsProvider>
      <App />
    </ClientsProvider>
  </React.StrictMode>
);
