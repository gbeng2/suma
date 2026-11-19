import Button, { ButtonProps } from "./Button.tsx";
import React from "react";

/**
 * A strong submit Button. The label is `children`.
 * The default is plain English because the prototype has no i18n:
 * in src/ui the default is `t("forms.continue")`.
 */
const ContinueButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function ContinueButton({ children = "Continue", type, ...rest }: ButtonProps, ref) {
  return (
    <Button ref={ref} variant="strong" type={type || "submit"} {...rest}>
      {children}
    </Button>
  );
});
export default ContinueButton;
