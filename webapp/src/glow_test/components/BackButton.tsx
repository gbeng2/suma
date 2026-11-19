import { CaretLeft } from "../icons";
import "./BackButton.css";
import Button, { ButtonProps } from "./Button.tsx";
import clsx from "clsx";
import React from "react";

export interface BackButtonProps
  extends Omit<
    ButtonProps,
    "variant" | "color" | "size" | "leadingIcon" | "trailingIcon"
  > {
  /**
   * Figma "label=Off": show only the caret, in a circle.
   * The label is still used as the aria-label.
   */
  hideLabel?: boolean;
}

/**
 * Figma "BackButton": small white pill with a caret, used on top of header photos.
 * The label is `children`, usually the name of the page it goes back to.
 * Without `to` or `onClick`, it goes back in the browser history.
 */
const BackButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BackButtonProps
>(function BackButton(
  { children = "Back", hideLabel, onClick, to, className, ...rest },
  ref
) {
  if (!to && !onClick) {
    onClick = () => window.history.back();
  }
  return (
    <Button
      ref={ref}
      variant="unstyled"
      className={clsx("back-button", hideLabel && "back-button-icon-only", className)}
      onClick={onClick}
      to={to}
      aria-label={hideLabel && typeof children === "string" ? children : undefined}
      {...rest}
    >
      <CaretLeft size={hideLabel ? 18 : 20} />
      {!hideLabel && children}
    </Button>
  );
});

export default BackButton;
