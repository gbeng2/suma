import "./Table.css";
import clsx from "clsx";
import React, { CSSProperties } from "react";

export interface TableTheme {
  headerColor?: string;
  backgroundColor1?: string;
  backgroundColor2?: string;
  hoverColor?: string;
}

export interface TableProps {
  children?: React.ReactNode;
  caption?: React.ReactNode;
  striped?: boolean;
  compact?: boolean;
  /** Draws the line under each row, like Figma "TableRow". On by default. */
  borders?: boolean;
  /** Figma only has md (Body S). */
  size?: "sm" | "md" | "lg";
  hover?: boolean;
  className?: string;
  style?: CSSProperties;
  theme?: TableTheme;
}

/**
 * A table made of Figma "TableRow"s. See TableRow, TableHeaders, TableFooter.
 * Put it in a Card to get the Figma "Table" example.
 */
export default function Table({
  striped,
  hover,
  compact,
  borders = true,
  caption,
  size = "md",
  theme = {},
  className,
  style,
  children,
}: TableProps) {
  const cls = clsx(
    "table",
    striped && "table-striped",
    compact && "table-compact",
    hover && "table-hover",
    borders && "table-borders",
    `table-${size}`,
    className
  );
  const sty: Record<string, any> = { ...style };
  (Object.keys(theme) as Array<keyof TableTheme>).forEach((k) => {
    sty[themeKeys[k]] = theme[k];
  });
  return (
    <table className={cls} style={sty}>
      {caption && <caption>{caption}</caption>}
      {children}
    </table>
  );
}

const themeKeys: Record<keyof TableTheme, string> = {
  headerColor: "--tcolor-header",
  backgroundColor1: "--tcolor-bg1",
  backgroundColor2: "--tcolor-bg2",
  hoverColor: "--tcolor-hover",
};
