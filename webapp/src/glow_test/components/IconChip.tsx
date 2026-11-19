import Icon, { IconPropsIcon } from "./Icon.tsx";
import "./IconChip.css";
import clsx from "clsx";

export interface IconChipProps {
  icon: IconPropsIcon;
  /**
   * Figma "color":
   * primary = soft sand background with a brand colored icon,
   * accent = strong brand background with a light icon.
   */
  color?: "primary" | "accent";
  /** Figma sizes M (40px) and L (48px). */
  size?: "md" | "lg";
  className?: string;
}

/** Figma "IconChip": a small rounded square with an icon in it. */
export default function IconChip({
  icon,
  color = "primary",
  size = "md",
  className,
}: IconChipProps) {
  const cls = clsx("icon-chip", `icon-chip-${color}`, `icon-chip-${size}`, className);
  return (
    <div className={cls}>
      <Icon icon={icon} />
    </div>
  );
}
