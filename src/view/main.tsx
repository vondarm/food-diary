import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import dayjs from "dayjs";
import ru from "dayjs/locale/ru";
import "./main.css";

dayjs.locale(ru);
dayjs.extend(weekday);
dayjs.extend(isBetween);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
