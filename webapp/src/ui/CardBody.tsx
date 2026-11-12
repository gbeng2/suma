import { ThemeSpacing } from "../types/theme";
import "./CardBody.css";
import clsx from "clsx";
import React from "react";

interface CardBodyProps {
  className?: string;
  children?: React.ReactNode;
  padding?: ThemeSpacing;
}

export default function CardBody({ padding = 6, className, children }: CardBodyProps) {
  const cls = clsx("card-body", `p-${padding}`, className);
  return <div className={cls}>{children}</div>;
}
