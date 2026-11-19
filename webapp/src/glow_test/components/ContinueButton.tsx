import { t } from "../../localization";
import Button, { ButtonProps } from "./Button.tsx";
import React from "react";

const ContinueButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function ContinueButton({ children, type, ...rest }: ButtonProps, ref) {
  children = children || t("forms.continue");
  return (
    <Button ref={ref} variant="strong" type={type || "submit"} {...rest}>
      {children}
    </Button>
  );
});
export default ContinueButton;
