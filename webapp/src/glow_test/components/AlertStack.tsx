import "./AlertStack.css";
import clsx from "clsx";
import React from "react";

export interface AlertStackProps {
  /** Figma "Heading" title. The heading is hidden when there is no title and no text. */
  title?: React.ReactNode;
  /** Smaller muted line under the title. */
  text?: React.ReactNode;
  /** The `<Alert>` elements. */
  children?: React.ReactNode;
  /**
   * Figma "Footer", used when the list is cut off ("reachedListLimit").
   * Use `<Button variant="ghost">See all 4 alerts</Button>`.
   */
  footer?: React.ReactNode;
  className?: string;
}

/** Figma "AlertStack": a card that groups several alerts. */
export default function AlertStack({
  title,
  text,
  children,
  footer,
  className,
}: AlertStackProps) {
  return (
    <div className={clsx("alert-stack", className)}>
      {(title || text) && (
        <div className="alert-stack-heading">
          {title && <div className="alert-stack-title">{title}</div>}
          {text && <div className="alert-stack-text">{text}</div>}
        </div>
      )}
      <div className="alert-stack-list">{children}</div>
      {footer && <div className="alert-stack-footer">{footer}</div>}
    </div>
  );
}
