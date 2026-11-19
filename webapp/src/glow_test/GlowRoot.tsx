import "./glow.css";
import "./tokens.css";
import clsx from "clsx";
import React from "react";

interface GlowRootProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Every glow_test page must render inside GlowRoot.
 * The `.glow` class turns on the prototype tokens (tokens.css) and the restyled
 * component CSS (components/*.css), which are all scoped to `.glow` so they
 * cannot change the real app.
 */
export default function GlowRoot({ className, children }: GlowRootProps) {
  return <div className={clsx("glow", className)}>{children}</div>;
}
