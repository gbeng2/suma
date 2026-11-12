import { ThemeSize } from "../types/theme";
import { ButtonVariant } from "./Button.tsx";
import IconButton from "./IconButton.tsx";
import "./Pagination.css";
import clsx from "clsx";
import { CSSProperties } from "react";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (pg: number) => void;
  variant?: ButtonVariant;
  size?: ThemeSize;
  className?: string;
  style?: CSSProperties;
}
export default function Pagination({
  page,
  pageCount,
  onPageChange,
  size,
  className,
  style,
}: PaginationProps) {
  const isFirstPage = page === 0;
  const isLastPage = page === pageCount - 1;
  return (
    <div className={clsx("pagination", className)} style={style}>
      <IconButton
        icon="left"
        variant="secondary"
        color={isFirstPage ? "primary" : "secondary"}
        size={size}
        disabled={isFirstPage}
        title={isFirstPage ? "" : `View Page ${page - 1}`}
        onClick={() => onPageChange(page - 1)}
        className={clsx("pagination-back")}
      />
      <IconButton
        icon="right"
        variant="secondary"
        color={isLastPage ? "primary" : "secondary"}
        size={size}
        disabled={isLastPage}
        title={isLastPage ? "" : `View Page ${page + 1}`}
        onClick={() => onPageChange(page + 1)}
        className={clsx("pagination-forward")}
      />
    </div>
  );
}
