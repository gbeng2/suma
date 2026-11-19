import ImageHeader, { ImageHeaderProps } from "./ImageHeader.tsx";
import "./ProgramHeader.css";
import React from "react";

export interface ProgramHeaderProps
  extends Pick<
    ImageHeaderProps,
    "image" | "imageAlt" | "backLabel" | "backTo" | "onBack"
  > {
  /** Small text above the title. Shown in capitals. */
  label?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

/**
 * Figma "ProgramHeader": top of a program page.
 * With `image` it is "State=Default". Without it, "State=No photo" (peach band).
 */
export default function ProgramHeader({
  label = "Program",
  title,
  description,
  ...imageHeaderProps
}: ProgramHeaderProps) {
  return (
    <ImageHeader band="peach" {...imageHeaderProps}>
      <div className="image-header-identity">
        <p className="program-header-label">{label}</p>
        <h1 className="image-header-title">{title}</h1>
        {description && <p className="image-header-description">{description}</p>}
      </div>
    </ImageHeader>
  );
}
