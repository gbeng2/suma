import "./Card.css";
import clsx from "clsx";
import React from "react";

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Figma "Card". The card itself is only the surface (background, border, radius, shadow).
 *
 * - Figma surface=Default: put a `<CardBody>` inside, it adds the padding.
 * - Figma surface=Grouped: put `<CardRow>`s inside, with no CardBody.
 */
export default function Card({ className, children }: CardProps) {
  const cls = clsx(className, "card");
  return <div className={cls}>{children}</div>;
}
