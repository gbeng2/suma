import "./Progress.css";
import React from "react";

interface ProgressBarProps {
  /** 0 to 100. */
  value: number;
  /** Figma "count": text after the bar, like "Step 2 of 5". */
  label?: React.ReactNode;
}

/** Figma "ProgressBar". */
export default function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-bar-fill" style={{ width: `${value}%` }} />
      </div>
      {label && <div className="progress-bar-label">{label}</div>}
    </div>
  );
}
