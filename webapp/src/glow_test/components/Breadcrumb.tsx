import { RoutePath } from "../../routing/RoutePath.ts";
import { CaretLeft, CaretRight } from "../icons";
import BackButton from "./BackButton.tsx";
import "./Breadcrumb.css";
import Button from "./Button.tsx";
import clsx from "clsx";
import React from "react";

interface BreadcrumbProps {
  /** Use it as the 'to' prop on the link. If not given (and no onClick), use history.back. */
  to?: RoutePath;
  onClick?: React.MouseEventHandler;
  /**
   * Figma "direction".
   * left: caret then label, in ink. Goes back or up, like "< Orders".
   * right: label then caret, smaller, in brand color. Goes forward, like "See all >".
   */
  direction?: "left" | "right";
  /**
   * Old name of `direction`, kept from src/ui/Breadcrumb.
   * "back" was the white pill: that is now the BackButton component.
   */
  variant?: "back" | "left" | "right";
  /**
   * A left breadcrumb has padding before the caret (the tap area).
   * By default a negative margin removes it, so the caret lines up with
   * the text above or below it. Use noOffset to keep the padding, like in Figma.
   */
  noOffset?: boolean;
  className?: string;
  /** The label. If not given, only a caret is shown. */
  children?: React.ReactNode;
}

/** Figma "BreadcrumbButton": a text link with a caret. */
export default function Breadcrumb({
  to,
  onClick,
  direction,
  variant,
  noOffset,
  className,
  children,
}: BreadcrumbProps) {
  if (!to && !onClick) {
    onClick = (e) => {
      e.preventDefault();
      window.history.back();
    };
  }
  if (variant === "back") {
    return (
      <BackButton to={to} onClick={onClick} className={className} hideLabel={!children}>
        {children || undefined}
      </BackButton>
    );
  }
  const dir = direction || variant || "left";
  const cls = clsx(
    "breadcrumb",
    `breadcrumb-${dir}`,
    dir === "left" && !noOffset && "breadcrumb-offset",
    className
  );
  return (
    <Button variant="unstyled" className={cls} to={to} onClick={onClick}>
      {dir === "left" && <CaretLeft size={20} />}
      {children && <span>{children}</span>}
      {dir === "right" && <CaretRight size={16} />}
    </Button>
  );
}
