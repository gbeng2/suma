import { ThemeSpacing } from "../types/theme";
import "./CardBody.css";
import clsx from "clsx";
import React, { CSSProperties } from "react";

interface CardBodyStyle extends CSSProperties {
  "--card-body-padding": string;
}

interface CardBodyProps {
  className?: string;
  padding?: ThemeSpacing;
  children?: React.ReactNode;
  style?: CardBodyStyle;
}

export default function CardBody({ padding, className, children, style }: CardBodyProps) {
  const cls = clsx("card-body", className);
  return (
    <div
      className={cls}
      style={{ "--card-body-padding": `var(--space-${padding})`, ...style }}
    >
      {children}
    </div>
  );
}
