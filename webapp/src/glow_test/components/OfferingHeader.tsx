import ImageHeader, { ImageHeaderProps } from "./ImageHeader.tsx";
import "./OfferingHeader.css";
import React from "react";

export interface OfferingHeaderStat {
  /** The big text, like "Nov 6". */
  value: React.ReactNode;
  /** The small text below it, like "Order by". */
  label: React.ReactNode;
}

export interface OfferingHeaderProps
  extends Pick<
    ImageHeaderProps,
    "image" | "imageAlt" | "backLabel" | "backTo" | "onBack"
  > {
  /** Status pill above the title, like `<Chip>Closes soon</Chip>`. */
  chip?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Figma "Stats": shown in one row, with a line between them. */
  stats?: OfferingHeaderStat[];
  /** Extra content at the bottom of the sheet, like an Alert. */
  children?: React.ReactNode;
}

/**
 * Figma "OfferingHeader": top of an offering page.
 * With `image` it is "State=Default". Without it, "State=No photo" (blue band).
 */
export default function OfferingHeader({
  chip,
  title,
  description,
  stats,
  children,
  ...imageHeaderProps
}: OfferingHeaderProps) {
  return (
    <ImageHeader band="blue" {...imageHeaderProps}>
      <div className="image-header-identity">
        {chip}
        <h1 className="image-header-title">{title}</h1>
        {description && <p className="image-header-description">{description}</p>}
      </div>
      {stats && stats.length > 0 && (
        <div className="offering-header-stats">
          {stats.map((stat, i) => (
            <div key={i} className="offering-header-stat">
              <p className="offering-header-stat-value">{stat.value}</p>
              <p className="offering-header-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
      {children && <div className="offering-header-extra">{children}</div>}
    </ImageHeader>
  );
}
