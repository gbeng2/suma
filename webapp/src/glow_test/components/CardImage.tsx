import "./CardImage.css";
import clsx from "clsx";
import React from "react";

/**
 * Figma "CardImage" types:
 * - default: goes edge to edge at the top of a Card (put it before the CardBody).
 * - inset: goes inside the CardBody, and has its own rounded corners.
 *
 * "flush" is the old name of "default" in src/ui.
 */
type CardImageVariant = "default" | "inset" | "flush";

interface CardImageProps {
  /** Usually an `<img>`. It is cropped to fill the area. Empty shows a placeholder color. */
  children?: React.ReactNode;
  variant?: CardImageVariant;
}

export default function CardImage({ children, variant = "default" }: CardImageProps) {
  const v = variant === "flush" ? "default" : variant;
  return <div className={clsx("card-image", `card-image-${v}`)}>{children}</div>;
}
