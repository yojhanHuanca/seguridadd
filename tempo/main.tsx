import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/globals.css";
import App from "../src/App";
import TempoHost from "./.tempo/tempo-host";

const isTempoHostRoute = window.location.pathname.startsWith("/tempo-host");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isTempoHostRoute ? <TempoHost /> : <App />}
  </StrictMode>,
);
