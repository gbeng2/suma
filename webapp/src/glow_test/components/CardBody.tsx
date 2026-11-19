import { ThemeSpacing } from "../../types/theme";
import "./CardBody.css";
import clsx from "clsx";
import React, { CSSProperties } from "react";

interface CardBodyStyle extends CSSProperties {
  "--card-body-padding"?: string;
  "--card-body-gap"?: string;
}

interface CardBodyProps {
  className?: string;
  /** Defaults to the Figma card padding (--space-6). */
  padding?: ThemeSpacing;
  /**
   * If given, the children are stacked vertically with this space between them.
   * Figma uses 3 between a title and its subtext, and 5 between an inset image and the text.
   */
  gap?: ThemeSpacing;
  children?: React.ReactNode;
  style?: CardBodyStyle;
}

/** The padded content area of a Card. */
export default function CardBody({
  padding,
  gap,
  className,
  children,
  style,
}: CardBodyProps) {
  const cls = clsx("card-body", gap !== undefined && "card-body-stack", className);
  const sty: CardBodyStyle = { ...style };
  if (padding !== undefined) {
    sty["--card-body-padding"] = `var(--space-${padding})`;
  }
  if (gap !== undefined) {
    sty["--card-body-gap"] = `var(--space-${gap})`;
  }
  return (
    <div className={cls} style={sty}>
      {children}
    </div>
  );
}
