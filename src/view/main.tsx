import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";

dayjs.extend(isBetween);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
