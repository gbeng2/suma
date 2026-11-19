import "./SectionHeader.css";
import clsx from "clsx";
import React from "react";

export interface SectionHeaderProps {
  title: React.ReactNode;
  /** Short text below the title. */
  text?: React.ReactNode;
  /**
   * Figma "End link": shown at the end of the row, lined up with the bottom.
   * Usually `<Breadcrumb direction="right">See all</Breadcrumb>`.
   */
  endLink?: React.ReactNode;
  className?: string;
}

/** Figma "SectionHeader": the title of one section in a page. */
export default function SectionHeader({
  title,
  text,
  endLink,
  className,
}: SectionHeaderProps) {
  return (
    <div className={clsx("section-header", className)}>
      <div className="section-header-body">
        <h2 className="section-header-title">{title}</h2>
        {text && <p className="section-header-text">{text}</p>}
      </div>
      {endLink}
    </div>
  );
}
