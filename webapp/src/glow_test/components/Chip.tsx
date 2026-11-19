import { ThemeColor } from "../../types/theme";
import "./Chip.css";
import clsx from "clsx";
import React, { CSSProperties } from "react";

interface ChipStyle extends CSSProperties {
  "--chip-bg"?: string;
  "--chip-color"?: string;
}

interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * The Figma "tint". Picks which color family the chip uses.
   * Renamed from src/ui/Chip `variant`.
   */
  color?: ThemeColor;
  /**
   * Figma "weight": soft = pale fill, strong = solid fill.
   * Replaces src/ui/Chip `invert` (invert = strong).
   */
  weight?: "soft" | "strong";
  /** Small icon element shown before the label, like `<Clock />`. */
  icon?: React.ReactNode;
  style?: ChipStyle;
}

/** Figma "Chip": a small status label. */
export default function Chip({
  color = "secondary",
  weight = "soft",
  icon,
  className,
  style,
  children,
  ...rest
}: ChipProps) {
  const sty: ChipStyle = {
    "--chip-bg": `var(--fill-${color}-${weight})`,
    "--chip-color": `var(--text-${color}-on-${weight})`,
    ...style,
  };
  return (
    <div className={clsx("chip", className)} style={sty} {...rest}>
      {icon && <span className="chip-icon">{icon}</span>}
      {children}
    </div>
  );
}
