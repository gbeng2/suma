import "./CardRow.css";
import clsx from "clsx";
import React from "react";

interface CardRowProps {
  /** The row label (Figma "label"). */
  children?: React.ReactNode;
  /** Figma "selected": gives the row the soft brand background. */
  selected?: boolean;
  /** Optional element before the label, like an IconChip. Not shown in Figma. */
  leading?: React.ReactNode;
  /** Optional element after the label, like a caret icon or Switch. Not shown in Figma. */
  trailing?: React.ReactNode;
  className?: string;
}

/**
 * Figma "CardRow": one row of a grouped Card (Figma Card surface=Grouped).
 * Put CardRows directly inside a `<Card>`. A line is drawn between rows.
 */
export default function CardRow({
  children,
  selected,
  leading,
  trailing,
  className,
}: CardRowProps) {
  return (
    <div className={clsx("card-row", selected && "card-row-selected", className)}>
      {leading}
      <div className="card-row-label">{children}</div>
      {trailing}
    </div>
  );
}
