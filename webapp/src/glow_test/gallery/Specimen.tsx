import "./Gallery.css";
import React from "react";

interface SpecimenProps {
  /** Component name, as it is called in Figma. */
  title: string;
  /** Figma node id, so the specimen can be compared with the design. */
  node?: string;
  children?: React.ReactNode;
}

/** One labeled box in the gallery. `id` makes it easy to screenshot. */
export default function Specimen({ title, node, children }: SpecimenProps) {
  return (
    <div className="gallery-specimen" id={`specimen-${title}`}>
      <div className="gallery-specimen-title">
        {title}
        {node && <span> · {node}</span>}
      </div>
      <div className="gallery-specimen-body">{children}</div>
    </div>
  );
}

export function Row({ children }: { children?: React.ReactNode }) {
  return <div className="gallery-row">{children}</div>;
}

export function Col({ children }: { children?: React.ReactNode }) {
  return <div className="gallery-col">{children}</div>;
}
