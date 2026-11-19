import "./OptionBody.css";
import clsx from "clsx";
import React from "react";

export interface OptionBodyProps {
  title?: React.ReactNode;
  /** Second line, in a muted color. */
  text?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/**
 * The text part of the option rows (the Figma layer "Body"): a title and a muted line.
 * It uses spans, so it can be put inside a <label>.
 */
export default function OptionBody({
  title,
  text,
  className,
  children,
}: OptionBodyProps) {
  return (
    <span className={clsx("option-body", className)}>
      {title && <span className="option-body-title">{title}</span>}
      {text && <span className="option-body-text">{text}</span>}
      {children}
    </span>
  );
}
