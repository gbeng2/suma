import "./DialogHeader.css";
import React from "react";

export interface DialogHeaderProps {
  /** Pass the same id to Dialog's `labelledBy`. */
  id: string;
  children?: React.ReactNode;
}

/** The title of a Dialog (Figma "Heading L", centered). */
export default function DialogHeader({ id, children }: DialogHeaderProps) {
  return (
    <h2 id={id} className="dialog-header">
      {children}
    </h2>
  );
}
