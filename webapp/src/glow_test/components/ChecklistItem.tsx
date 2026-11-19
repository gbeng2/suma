import { Check } from "../icons";
import "./ChecklistItem.css";
import React from "react";

export interface ChecklistItemProps {
  /**
   * Figma "state". Renamed from src/ui/ChecklistItem `variant`
   * ("checked" is now "done").
   */
  state?: "done" | "current" | "future";
  /** Figma "number". Checklist fills this in, so it is only needed to override. */
  step?: number;
  /** Added automatically by Checklist. */
  autostep?: number;
  /** Figma "label". */
  children?: React.ReactNode;
}

/**
 * Figma "ChecklistItem": one step of a Checklist.
 * The Figma "line" property (the line back to the previous step) is automatic:
 * CSS hides it on the first item.
 */
export default function ChecklistItem({
  state = "future",
  step,
  autostep,
  children,
}: ChecklistItemProps) {
  step = step || autostep || 0;
  return (
    <li
      className={`checklist-item checklist-item-${state}`}
      aria-current={state === "current" ? "step" : undefined}
    >
      <div className="checklist-item-mark">
        {state === "done" ? <Check className="checklist-item-check" /> : step}
      </div>
      <div className="checklist-item-label">{children}</div>
    </li>
  );
}
