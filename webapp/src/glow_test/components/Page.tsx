import "./Page.css";
import clsx from "clsx";
import React, { CSSProperties } from "react";

interface PageProps {
  /**
   * Show a buffer around the content. Most pages should use this,
   * unless they go right to the edge (like a page with a ProgramHeader).
   */
  buffer?: boolean;
  /** The gap between children, as a space token number (7 is --space-7). */
  gap?: number;
  /**
   * The bottom nav, for tab root pages: `nav={<Nav active="home" />}`.
   * It stays at the bottom while the content scrolls.
   */
  nav?: React.ReactNode;
  /**
   * The page is as tall as the screen by default.
   * Set to false to let it be as tall as its content (used in the gallery).
   */
  fullHeight?: boolean;
  /** Main page content. */
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** The shell of every page: a scrolling column of content, and the optional bottom nav. */
export default function Page({
  buffer = true,
  gap = 7,
  nav,
  fullHeight = true,
  children,
  className,
  style,
}: PageProps) {
  return (
    <div className={clsx("page-outer", fullHeight && "page-outer-full-height")}>
      <div
        className={clsx("page", buffer && "page-buffer", className)}
        style={{ gap: `var(--space-${gap})`, ...style }}
      >
        {children}
      </div>
      {nav}
    </div>
  );
}
