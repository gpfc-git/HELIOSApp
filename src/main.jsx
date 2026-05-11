import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { Providers } from "./app/providers.jsx";
import { AppRouter } from "./app/router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <AppRouter />
    </Providers>
  </StrictMode>,
);
