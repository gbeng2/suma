import "./CardImage.css";
import clsx from "clsx";
import React from "react";

type CardImageVariant = "inset" | "flush";

interface CardImageProps {
  children?: React.ReactNode;
  variant?: CardImageVariant;
}
export default function CardImage({ children, variant = "flush" }: CardImageProps) {
  return <div className={clsx("card-image", `card-image-${variant}`)}>{children}</div>;
}
