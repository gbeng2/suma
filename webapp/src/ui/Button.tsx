import Link from "../routing/Link.tsx";
import { RoutePathOrUrl } from "../routing/RoutePath.ts";
import { assertNever } from "../types/global.ts";
import { ThemeColor, ThemeSize } from "../types/theme";
import "./Button.css";
import clsx from "clsx";
import React, { CSSProperties, MouseEventHandler } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "text" | "unstyled";
interface ButtonStyle extends CSSProperties {
  "--btn-color"?: string;
  "--btn-color-hover"?: string;
  "--btn-bg"?: string;
  "--btn-bg-hover"?: string;
  "--btn-border"?: string;
  "--btn-x"?: string;
  "--btn-y"?: string;
}

export interface ButtonProps {
  variant?: ButtonVariant;
  color?: ThemeColor;
  size?: ThemeSize;
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
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      className,
      style,
      to,
      variant = "primary",
      color = "primary",
      size = "md",
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
    const sty: ButtonStyle = { ...toButtonStyle(variant, color, size), ...style };
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
          {children}
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
        {children}
      </button>
    );
  }
);

export default Button;

function toButtonStyle(v: ButtonVariant, c: ThemeColor, s: ThemeSize): ButtonStyle {
  let size;
  if (s === "sm") {
    size = {
      "--btn-y": "var(--space-4)",
      "--btn-x": "var(--space-5)",
    };
  } else if (s === "md") {
    size = {
      "--btn-y": "var(--space-6)",
      "--btn-x": "var(--space-7)",
    };
  } else {
    size = {
      "--btn-y": "var(--space-7)",
      "--btn-x": "var(--space-8)",
    };
  }
  if (v === "primary") {
    return {
      ...size,
      "--btn-color": `var(--text-${c}-on-strong)`,
      "--btn-color-hover": `var(--text-${c}-on-strong)`,
      "--btn-bg": `var(--fill-${c}-strong)`,
      "--btn-bg-hover": `var(--fill-${c}-strong-hover)`,
      "--btn-border": `transparent`,
    };
  } else if (v === "secondary") {
    return {
      ...size,
      "--btn-color": `var(--text-${c})`,
      "--btn-color-hover": `var(--text-${c})`,
      "--btn-bg": `var(--fill-${c}-soft)`,
      "--btn-bg-hover": `var(--fill-${c}-soft-hover)`,
      "--btn-border": `transparent`,
    };
  } else if (v === "outline") {
    return {
      ...size,
      "--btn-color": `var(--text-${c}-mute)`,
      "--btn-color-hover": `var(--color-${c}-hover)`,
      "--btn-bg": `transparent`,
      "--btn-bg-hover": `var(--fill-${c}-soft)`,
      "--btn-border": `var(--border-${c}-strong) var(--border-width) solid`,
    };
  } else if (v === "text") {
    return {
      ...size,
      "--btn-color": `var(--text-${c})`,
      "--btn-color-hover": `var(--text-${c}-hover)`,
      "--btn-bg": `transparent`,
      "--btn-bg-hover": `var(--fill-${c}-soft)`,
      "--btn-border": `transparent`,
    };
  } else if (v === "unstyled") {
    return {
      ...size,
      "--btn-color": "unset",
      "--btn-color-hover": "unset",
      "--btn-bg": "unset",
      "--btn-bg-hover": "unset",
      "--btn-border": "unset",
    };
  }
  assertNever(v);
}
