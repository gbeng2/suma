import { RoutePath } from "../../routing/RoutePath.ts";
import { BuildingStorefront, Home, ShoppingCartOutline, SquaresPlus } from "../icons";
import { NavOptionProps } from "./NavOption.tsx";

export interface NavItem {
  /** Compared with the `active` prop of Nav. */
  key: string;
  label: string;
  Icon: NavOptionProps["Icon"];
  to?: RoutePath;
}

/**
 * The four tabs from Figma "BottomNav" (1922:12349), as used on the Dashboard.
 * When this is moved to src/ui, add `to` (and translated labels) for each item,
 * or pass your own `items`.
 */
export const defaultNavItems: NavItem[] = [
  { key: "home", label: "Home", Icon: Home },
  { key: "commerce", label: "Commerce", Icon: BuildingStorefront },
  { key: "map", label: "Map", Icon: ShoppingCartOutline },
  { key: "more", label: "More", Icon: SquaresPlus },
];
