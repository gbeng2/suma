import "./Progress.css";
import clsx from "clsx";

interface ProgressCircleProps {
  /** 0 to 100. */
  value: number;
  /** Outer width and height in px. Figma size is 56. */
  size?: number;
  /** Ring thickness in px. Figma uses 1/12 of the size. */
  stroke?: number;
  /** Figma "surface". Use "on-strong" when the circle sits on a strong brand fill. */
  surface?: "default" | "on-strong";
}

/** Figma "ProgressCircle". */
export default function ProgressCircle({
  value,
  size = 56,
  stroke = size / 12,
  surface = "default",
}: ProgressCircleProps) {
  // In Figma the ring is inset by half of its thickness.
  const radius = size / 2 - stroke;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);
  const circle = {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    fill: "none",
    strokeWidth: stroke,
  };
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={clsx("progress-circle", `progress-circle-${surface}`)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="progress-circle-track" {...circle} />
        <circle
          className="progress-circle-bar"
          {...circle}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="progress-circle-text">{value}%</div>
    </div>
  );
}
