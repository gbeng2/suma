import ProgressBar from "./ProgressBar.tsx";
import ProgressCircle from "./ProgressCircle.tsx";

interface ProgressProps {
  value: number;
  /** Circle only. */
  size?: number;
  /** Circle only. */
  stroke?: number;
  variant?: "bar" | "circle";
}

/**
 * Kept from src/ui so old imports still work.
 * New code can use ProgressBar or ProgressCircle directly.
 */
export default function Progress({
  value,
  size,
  stroke,
  variant = "bar",
}: ProgressProps) {
  if (variant === "circle") {
    return <ProgressCircle value={value} size={size} stroke={stroke} />;
  }
  return <ProgressBar value={value} />;
}
