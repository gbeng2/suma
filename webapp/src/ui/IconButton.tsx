import { ThemeSize } from "../types/theme";
import "./Button.css";
import Button, { ButtonProps } from "./Button.tsx";
import Icon, { IconPropsIcon } from "./Icon.tsx";
import "./IconButton.css";
import clsx from "clsx";
import React from "react";

export interface IconButtonProps extends ButtonProps {
  icon: IconPropsIcon;
}

const IconButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonProps
>(function IconButton({ icon, size = "md", color, className, ...rest }, ref) {
  return (
    <div>
      <Button
        className={clsx("icon-button", `icon-button-${size}`, className)}
        size={size}
        color={color}
        {...rest}
        ref={ref}
      >
        <Icon icon={icon} size={iconSizes[size]} />
      </Button>
    </div>
  );
});

const iconSizes: Record<ThemeSize, number> = {
  sm: 18,
  md: 27,
  lg: 36,
};

export default IconButton;
