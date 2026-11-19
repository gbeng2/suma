import "./Spinner.css";
import clsx from "clsx";
import React from "react";

interface SpinnerProps {
  /** Width and height. Figma size is 16. Can be a CSS size like "1em". */
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Figma "Spinner": a 3/4 ring that rotates.
 * It uses currentColor, so set `color` on it or on its parent.
 */
export default function Spinner({ size = 16, className, style }: SpinnerProps) {
  return (
    <svg
      className={clsx("spinner", className)}
      style={{ width: size, height: size, ...style }}
      viewBox="0 0 16 16"
      fill="none"
      role="status"
      aria-label="Loading"
    >
      {/* pathLength=100 lets the dash array read as percent: 75 drawn, 25 gap. */}
      <circle
        cx="8"
        cy="8"
        r="7"
        pathLength="100"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="75 25"
      />
    </svg>
  );
}
