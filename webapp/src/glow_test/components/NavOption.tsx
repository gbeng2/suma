import Link from "../../routing/Link.tsx";
import { RoutePath } from "../../routing/RoutePath.ts";
import "./NavOption.css";
import clsx from "clsx";
import React from "react";

export interface NavOptionProps {
  label: string;
  /** Icon component from `glow_test/icons`. Figma calls it the "Glyph". */
  Icon: React.ComponentType<{ size?: number | string }>;
  /** True for the tab of the current page. */
  active?: boolean;
  /** Renders a link. Without `to`, a button is rendered (use `onClick`). */
  to?: RoutePath;
  onClick?: React.MouseEventHandler;
}

/**
 * Figma "NavOption": one tab of the bottom Nav.
 * A round "Puck" with a glyph, and a label below it.
 */
export default function NavOption({ label, Icon, active, to, onClick }: NavOptionProps) {
  const cls = clsx("nav-option", active && "nav-option-active");
  const content = (
    <>
      <span className="nav-option-puck">
        <Icon size={GLYPH_SIZE} />
      </span>
      <span className="nav-option-label">{label}</span>
    </>
  );
  if (to) {
    return (
      <Link
        to={to}
        className={cls}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

/** Glyph size from Figma. */
const GLYPH_SIZE = 18;
