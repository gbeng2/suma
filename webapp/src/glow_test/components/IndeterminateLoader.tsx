import { ThemeColor } from "../../types/theme";
import "./IndeterminateLoader.css";
import Spinner from "./Spinner.tsx";
import clsx from "clsx";
import React from "react";

interface IndeterminateLoaderProps {
  /**
   * plain: only the spinner.
   * content: covers its parent (the parent needs `position: relative`).
   * screen: covers the whole screen.
   */
  variant?: "plain" | "screen" | "content";
  size?: number | string;
  color?: ThemeColor | "inherit";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Figma "Loader". The Figma frame is still a "Todo" note that lists the three
 * variants, so the layout is kept from src/ui and only the spinner is new.
 */
export default function IndeterminateLoader({
  variant = "content",
  size,
  color = "inherit",
  className,
  style,
}: IndeterminateLoaderProps) {
  const sty = { ...style };
  if (color !== "inherit") {
    sty.color = `var(--text-${color}-mute)`;
  } else if (variant === "plain") {
    // A plain loader sits inside other things (like a button), so it takes their color.
    sty.color = "inherit";
  }
  if (variant === "plain") {
    return <Spinner size={size || 60} className={className} style={sty} />;
  }
  if (variant === "screen") {
    return (
      <div className={clsx("indeterminate-loader-screen", className)}>
        <Spinner size={size || 160} style={sty} />
      </div>
    );
  }
  return (
    <div className={clsx("indeterminate-loader-content", className)}>
      <Spinner size={size || 120} style={sty} />
    </div>
  );
}
