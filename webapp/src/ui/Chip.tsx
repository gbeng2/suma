import { ThemeColor } from "../types/theme";
import "./Chip.css";
import clsx from "clsx";
import React from "react";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ThemeColor;
  invert?: boolean;
}

export default function Chip({
  variant = "primary",
  invert,
  className,
  ...rest
}: ChipProps) {
  const cls = clsx(
    className,
    `chip`,
    `chip-${variant}`,
    invert
      ? `color-${variant}-contrast bgcolor-${variant}`
      : `color-${variant} bgcolor-${variant}-soft`
  );
  return <div className={cls} {...rest} />;
}
