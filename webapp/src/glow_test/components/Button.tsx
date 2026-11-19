import Link from "../../routing/Link.tsx";
import { RoutePathOrUrl } from "../../routing/RoutePath.ts";
import { ThemeColor, ThemeSize } from "../../types/theme";
import "./Button.css";
import clsx from "clsx";
import React, { CSSProperties, MouseEventHandler } from "react";

/**
 * Figma "Button" types: strong, soft, outline, ghost.
 * "unstyled" and "inherit" are not in Figma. They are kept from src/ui/Button
 * for buttons that only need the click behavior (like Breadcrumb).
 *
 * Renamed from src/ui/Button: primary -> strong, secondary -> soft, text -> ghost.
 */
export type ButtonVariant =
  | "strong"
  | "soft"
  | "outline"
  | "ghost"
  | "unstyled"
  | "inherit";

interface ButtonStyle extends CSSProperties {
  "--btn-color"?: string;
  "--btn-bg"?: string;
  "--btn-bg-hover"?: string;
  "--btn-border-color"?: string;
}

export interface ButtonProps {
  variant?: ButtonVariant;
  /** The Figma "tint". Picks which color family the variant uses. */
  color?: ThemeColor;
  /** Figma sizes S, M, L. */
  size?: ThemeSize;
  /** Icon element shown before the label, like `<Plus />`. */
  leadingIcon?: React.ReactNode;
  /** Icon element shown after the label, like `<CaretRight />`. */
  trailingIcon?: React.ReactNode;
  className?: string;
  style?: ButtonStyle;
  to?: RoutePathOrUrl;
  disabled?: boolean;
  inline?: boolean;
  children?: React.ReactNode;
  title?: string;
  type?: "submit" | "reset" | "button" | undefined;
  value?: string;
  onClick?: MouseEventHandler;
  "aria-label"?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      className,
      style,
      to,
      variant = "strong",
      color = "primary",
      size = "md",
      leadingIcon,
      trailingIcon,
      disabled,
      inline,
      children,
      type = "button",
      ...rest
    },
    ref
  ) {
    const cls = clsx(
      `btn`,
      `btn-${variant}`,
      `btn-${size}`,
      inline && `btn-inline`,
      to && "btn-link",
      className
    );
    const sty: ButtonStyle = { ...toButtonStyle(variant, color), ...style };
    const content = (
      <>
        {leadingIcon && <span className="btn-icon">{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className="btn-icon">{trailingIcon}</span>}
      </>
    );
    if (to) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          className={cls}
          style={sty}
          aria-disabled={disabled}
          {...rest}
        >
          {content}
        </Link>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={cls}
        style={sty}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

export default Button;

/** Colors depend on variant + color, so they are set as CSS variables here. */
function toButtonStyle(v: ButtonVariant, c: ThemeColor): ButtonStyle {
  switch (v) {
    case "strong":
      return {
        "--btn-color": `var(--text-${c}-on-strong)`,
        "--btn-bg": `var(--fill-${c}-strong)`,
        "--btn-bg-hover": `var(--fill-${c}-strong-hover)`,
      };
    case "soft":
      return {
        "--btn-color": `var(--text-${c}-on-soft)`,
        "--btn-bg": `var(--fill-${c}-soft)`,
        "--btn-bg-hover": `var(--fill-${c}-soft-hover)`,
      };
    case "outline":
      return {
        "--btn-color": `var(--text-${c}-mute)`,
        "--btn-bg": `transparent`,
        "--btn-bg-hover": `var(--fill-${c}-soft)`,
        "--btn-border-color": `var(--border-${c}-subtle)`,
      };
    case "ghost":
      return {
        "--btn-color": `var(--text-${c}-mute)`,
        "--btn-bg": `transparent`,
        "--btn-bg-hover": `var(--fill-${c}-soft)`,
      };
    default:
      return {};
  }
}
