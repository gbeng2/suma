import "./PageHeader.css";
import clsx from "clsx";
import React from "react";

export interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}

/** Figma "PageHeader": the big title at the top of a page, with an optional subtitle. */
export default function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={clsx("page-header", className)}>
      <h1 className="page-header-title">{title}</h1>
      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
    </div>
  );
}
