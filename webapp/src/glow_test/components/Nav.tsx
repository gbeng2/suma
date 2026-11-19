import "./Nav.css";
import NavOption from "./NavOption.tsx";
import { NavItem, defaultNavItems } from "./navItems.ts";
import clsx from "clsx";
import React from "react";

export interface NavProps {
  /** Key of the current tab, like "home". */
  active?: string;
  items?: NavItem[];
  /** Called with the item key when a tab is clicked. */
  onSelect?: (key: string) => void;
  className?: string;
}

/**
 * Figma "Nav" / "BottomNav": the tab bar at the bottom of a tab root page.
 * It only shows what it gets by props. It does not read the route or app state.
 * Place it with `<Page nav={<Nav active="home" />}>`.
 */
const Nav = React.forwardRef<HTMLElement, NavProps>(function Nav(
  { active, items = defaultNavItems, onSelect, className }: NavProps,
  ref
) {
  return (
    <nav ref={ref} className={clsx("nav", className)}>
      {items.map((item) => (
        <NavOption
          key={item.key}
          label={item.label}
          Icon={item.Icon}
          to={item.to}
          active={item.key === active}
          onClick={onSelect && (() => onSelect(item.key))}
        />
      ))}
    </nav>
  );
});
export default Nav;
