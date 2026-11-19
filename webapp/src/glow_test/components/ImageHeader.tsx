import { RoutePath } from "../../routing/RoutePath.ts";
import BackButton from "./BackButton.tsx";
import "./ImageHeader.css";
import clsx from "clsx";
import React from "react";

export interface ImageHeaderProps {
  /** URL of the cover photo. Without it, a short color band is shown ("No photo"). */
  image?: string;
  imageAlt?: string;
  /** Color of the band when there is no photo. */
  band?: "peach" | "blue";
  /** Label of the BackButton, usually the name of the page it goes back to. */
  backLabel?: React.ReactNode;
  /** If backTo and onBack are not given, the BackButton uses history.back. */
  backTo?: RoutePath;
  onBack?: React.MouseEventHandler;
  className?: string;
  /** Content of the sheet. */
  children: React.ReactNode;
}

/**
 * The shared layout of Figma "ProgramHeader" and "OfferingHeader":
 * a "Cover" (photo or color band) with a BackButton on it, and a "Sheet"
 * with rounded top corners that overlaps the bottom of the cover.
 */
export default function ImageHeader({
  image,
  imageAlt = "",
  band = "peach",
  backLabel,
  backTo,
  onBack,
  className,
  children,
}: ImageHeaderProps) {
  return (
    <div className={clsx("image-header", className)}>
      <div
        className={clsx(
          "image-header-cover",
          !image && `image-header-cover-band image-header-cover-${band}`
        )}
      >
        {image && <img className="image-header-image" src={image} alt={imageAlt} />}
        <BackButton to={backTo} onClick={onBack} className="image-header-back">
          {backLabel}
        </BackButton>
      </div>
      <div className="image-header-sheet">{children}</div>
    </div>
  );
}
