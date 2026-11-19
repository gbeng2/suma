import useId from "../../state/useId.ts";
import Checkbox from "./Checkbox.tsx";
import "./CheckboxCard.css";
import InputFeedback, { HasInputFeedback } from "./InputFeedback.tsx";
import OptionBody from "./OptionBody.tsx";
import clsx from "clsx";
import React from "react";

export interface CheckboxCardProps
  extends HasInputFeedback,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "type" | "title"> {
  checked: boolean;
  title?: React.ReactNode;
  text?: React.ReactNode;
  name?: string;
  alignCheckbox?: "start" | "center" | "end";
  children?: React.ReactNode;
}

/**
 * Not in Figma. It is a Figma "CheckboxRow" (see CheckboxRow.tsx) inside a Card.
 * Prefer CheckboxRow for new screens.
 */
const CheckboxCard = React.forwardRef<HTMLInputElement, CheckboxCardProps>(
  function CheckboxCard(
    {
      id,
      title,
      text,
      error,
      alignCheckbox = "center",
      children,
      ...rest
    }: CheckboxCardProps,
    ref
  ) {
    const inputId = useId(id);
    return (
      <label
        className={clsx("card checkbox-card", error && "is-invalid")}
        style={{ alignItems: alignCheckbox }}
      >
        <Checkbox ref={ref} id={inputId} error={error} {...rest} />
        <OptionBody title={title} text={text}>
          {children}
          <InputFeedback inputId={inputId} error={error} />
        </OptionBody>
      </label>
    );
  }
);
export default CheckboxCard;
