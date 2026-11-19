import "./CardText.css";
import clsx from "clsx";
import React, { CSSProperties } from "react";

interface CardTextProps {
  /**
   * Figma "FigmaOnlyCardText" types:
   * title = Heading XS, subtitle = Body M Semi, text = Body M, subtext = Body S (muted).
   */
  variant?: "title" | "subtitle" | "text" | "subtext";
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export default function CardText({
  variant = "text",
  className,
  style,
  children,
}: CardTextProps) {
  const cls = clsx(className, "card-text", `card-text-${variant}`);
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}
