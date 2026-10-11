import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { resolveSource } from "./data/load-quota";
import { App } from "./ui/App";
import "./ui/styles.css";

const root = document.getElementById("root");
if (root === null) throw new Error("index.html has no #root element.");

createRoot(root).render(
  <StrictMode>
    <App
      source={resolveSource(window.location.search)}
      timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
    />
  </StrictMode>,
);
