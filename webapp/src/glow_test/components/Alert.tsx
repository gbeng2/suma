import Link from "../../routing/Link.tsx";
import { RoutePathOrUrl } from "../../routing/RoutePath.ts";
import { ThemeColor } from "../../types/theme";
import { CaretRight } from "../icons";
import "./Alert.css";
import Icon, { IconPropsIcon } from "./Icon.tsx";
import clsx from "clsx";
import React, { CSSProperties } from "react";

interface AlertStyle extends CSSProperties {
  "--alert-bg"?: string;
  "--alert-border-color"?: string;
  "--alert-icon-bg"?: string;
  "--alert-icon-color"?: string;
}

export interface AlertProps {
  /** The Figma "tint". Picks which color family the alert uses. */
  color?: ThemeColor;
  /**
   * Figma "emphasis". Changes the icon chip only:
   * strong = solid chip with a light glyph, soft = pale chip with a dark glyph.
   */
  emphasis?: "strong" | "soft";
  /** Figma "border". Set to false to remove the outline. */
  border?: boolean;
  title?: React.ReactNode;
  /** Figma "text": smaller muted line under the title. */
  text?: React.ReactNode;
  /** Glyph in the icon chip. Pass null to hide the chip. */
  icon?: IconPropsIcon | null;
  /**
   * Figma "button": shown under the text.
   * Use `<Button variant="outline" size="sm" color={sameColorAsAlert}>`.
   */
  action?: React.ReactNode;
  /** Figma "linked": the whole alert becomes a link and shows a caret. */
  to?: RoutePathOrUrl;
  className?: string;
}

/** Figma "Alert". */
export default function Alert({
  color = "primary",
  emphasis = "strong",
  border = true,
  title,
  text,
  icon = "info",
  action,
  to,
  className,
}: AlertProps) {
  const cls = clsx(
    "alert",
    !border && "alert-no-border",
    to && "alert-linked",
    className
  );
  const sty = toAlertStyle(color, emphasis);
  const content = (
    <>
      {icon && (
        <div className="alert-icon">
          <Icon icon={icon} size="var(--alert-glyph-size)" />
        </div>
      )}
      <div className="alert-body">
        {title && <div className="alert-title">{title}</div>}
        {text && <div className="alert-text">{text}</div>}
        {action && <div className="alert-actions">{action}</div>}
      </div>
      {to && <CaretRight className="alert-caret" />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} style={sty}>
        {content}
      </Link>
    );
  }
  return (
    <div className={cls} style={sty}>
      {content}
    </div>
  );
}

/** Colors depend on color + emphasis, so they are set as CSS variables here. */
function toAlertStyle(c: ThemeColor, emphasis: "strong" | "soft"): AlertStyle {
  const base: AlertStyle = {
    "--alert-bg": `var(--fill-${c}-soft)`,
    // There is no --border-warning-subtle token yet, so fall back to a close fill.
    "--alert-border-color": `var(--border-${c}-subtle, var(--fill-${c}-soft-pressed))`,
  };
  if (emphasis === "soft") {
    return {
      ...base,
      "--alert-icon-bg": `var(--fill-${c}-soft-hover)`,
      "--alert-icon-color": `var(--text-${c}-on-soft)`,
    };
  }
  return {
    ...base,
    "--alert-icon-bg": `var(--fill-${c}-strong)`,
    "--alert-icon-color": `var(--text-${c}-on-strong)`,
  };
}
