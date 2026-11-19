import IconButton from "./IconButton.tsx";
import "./Pagination.css";
import clsx from "clsx";
import { CSSProperties } from "react";

export interface PaginationProps {
  /** The current page. The first page is 0. */
  page: number;
  pageCount: number;
  onPageChange: (pg: number) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Figma "Pagination": one dot for each page on the left (the current page is a
 * wide dot), Previous and Next buttons on the right.
 * Figma "position" Start / Middle / End is `page` compared with `pageCount`.
 */
export default function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  style,
}: PaginationProps) {
  const isFirstPage = page === 0;
  const isLastPage = page === pageCount - 1;
  const pages = Array.from({ length: pageCount }, (_, i) => i);
  return (
    <div className={clsx("pagination", className)} style={style}>
      <div className="pagination-dots" aria-label={`Page ${page + 1} of ${pageCount}`}>
        {pages.map((pg) => (
          <span
            key={pg}
            className={clsx("pagination-dot", pg === page && "pagination-dot-current")}
          />
        ))}
      </div>
      <div className="pagination-arrows">
        <IconButton
          icon="left"
          variant="soft"
          color="secondary"
          size="sm"
          disabled={isFirstPage}
          aria-label="Previous page"
          onClick={() => onPageChange(page - 1)}
          className="pagination-arrow"
        />
        <IconButton
          icon="right"
          variant="soft"
          color="secondary"
          size="sm"
          disabled={isLastPage}
          aria-label="Next page"
          onClick={() => onPageChange(page + 1)}
          className="pagination-arrow"
        />
      </div>
    </div>
  );
}
