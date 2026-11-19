import { ThemeSize } from "../../types/theme";
import Button, { ButtonProps } from "./Button.tsx";
import Icon, { IconPropsIcon } from "./Icon.tsx";
import "./IconButton.css";
import clsx from "clsx";
import React from "react";

export interface IconButtonProps
  extends Omit<ButtonProps, "leadingIcon" | "trailingIcon" | "children" | "inline"> {
  icon: IconPropsIcon;
  /** An icon-only button has no visible text, so screen readers need this. */
  "aria-label"?: string;
}

/** Figma "IconButton": a round Button with only a glyph. Same types and sizes as Button. */
const IconButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonProps
>(function IconButton({ icon, size = "md", className, ...rest }, ref) {
  return (
    <Button className={clsx("icon-button", className)} size={size} {...rest} ref={ref}>
      <Icon icon={icon} size={iconSizes[size]} />
    </Button>
  );
});

/** Glyph sizes from Figma: half of the button height. */
const iconSizes: Record<ThemeSize, number> = {
  sm: 18,
  md: 27,
  lg: 36,
};

export default IconButton;
