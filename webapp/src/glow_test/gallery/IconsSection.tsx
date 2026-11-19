import * as icons from "../icons";
import Specimen from "./Specimen.tsx";
import React from "react";

/** Figma section "Icons" (2472:17608). */
export default function IconsSection() {
  return (
    <section className="gallery-section" id="icons">
      <h2>Icons</h2>
      <Specimen title="Icons" node="2472:17608">
        {Object.entries(icons).map(([name, C]) => {
          const IconC = C as React.ComponentType<{ size?: number }>;
          return (
            <div key={name} className="gallery-icon">
              <IconC size={24} />
              {name}
            </div>
          );
        })}
      </Specimen>
    </section>
  );
}
