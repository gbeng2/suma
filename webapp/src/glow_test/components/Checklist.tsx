import "./Checklist.css";
import { ChecklistItemProps } from "./ChecklistItem.tsx";
import React from "react";

export interface ChecklistProps {
  /** `<ChecklistItem>` elements. They are numbered in order. */
  children?: React.ReactNode;
}

/**
 * Figma "Checklist": a horizontal row of numbered steps.
 * (src/ui/Checklist was a vertical list inside a Card. The Figma one has no card.)
 */
export default function Checklist({ children }: ChecklistProps) {
  let autostep = 0;
  const kids = React.Children.map(children, (child) => {
    if (!React.isValidElement<ChecklistItemProps>(child)) {
      return child;
    }
    autostep += 1;
    return React.cloneElement(child, { autostep });
  });
  return <ol className="checklist">{kids}</ol>;
}
