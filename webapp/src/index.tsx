import "./assets/styles/imports";
import isGlowPath from "./glow_test/isGlowPath.ts";
import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!);

if (isGlowPath()) {
  // Glow prototype pages (src/glow_test) load on their own, without App.tsx,
  // so they need no backend and are not affected by the rest of the app.
  import("./glow_test/GlowApp.tsx").then(({ default: GlowApp }) => {
    root.render(
      <React.StrictMode>
        <GlowApp />
      </React.StrictMode>
    );
  });
} else {
  Promise.all([import("./App"), import("./Metrics")]).then(
    ([{ default: App }, { default: Metrics }]) => {
      root.render(
        <React.StrictMode>
          <App />
          <Metrics />
        </React.StrictMode>
      );
    }
  );
}
