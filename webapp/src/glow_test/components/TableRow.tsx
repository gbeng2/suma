import { renderTableCell, TableCell } from "./TableHelpers.tsx";
import clsx from "clsx";
import { CSSProperties } from "react";

export interface TableRowProps {
  cells: TableCell[];
  highlight?: boolean;
  /** Figma "TableRow/true" (muted=true): a less important row, like a discount. */
  muted?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Figma "TableRow". The last cell is right aligned and strong. */
export default function TableRow({
  cells,
  highlight,
  muted,
  className,
  style,
}: TableRowProps) {
  const cls = clsx(
    highlight && "table-row-highlight",
    muted && "table-row-muted",
    className
  );
  return (
    <tr className={cls} style={style}>
      {cells.map((c) => renderTableCell(c, "td"))}
    </tr>
  );
}
