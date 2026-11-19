import useId from "../../state/useId";
import { Check } from "../icons";
import "./Checkbox.css";
import InputFeedback, { HasInputFeedback } from "./InputFeedback.tsx";
import clsx from "clsx";
import React from "react";

export interface CheckboxProps
  extends HasInputFeedback,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "type"> {
  /** Without a label, only the 22px control is rendered (Figma "Checkbox"). */
  label?: React.ReactNode;
  checked: boolean;
  inputClass?: string;
  noFeedback?: boolean;
}

/**
 * Figma "Checkbox".
 * Figma state=Error is the `error` prop, state=Disabled is `disabled`.
 * Focus is the browser focus (`inputClass="is-focus-visible"` forces it in the gallery).
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    checked,
    error,
    help,
    required = false,
    id,
    className,
    inputClass,
    noFeedback,
    ...rest
  },
  ref
) {
  const inputId = useId(id);
  const control = (
    <span className={clsx("checkbox", !label && className)}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        checked={checked}
        required={required}
        className={clsx("checkbox-input", inputClass)}
        aria-describedby={InputFeedback.idFor(inputId)}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {/* Figma "Tick" is 14px. */}
      <Check className="checkbox-tick" size={14} />
    </span>
  );
  if (!label) {
    return control;
  }
  return (
    <div className={className}>
      <label className="form-check">
        {control}
        <span>{label}</span>
      </label>
      {!noFeedback && <InputFeedback inputId={inputId} error={error} help={help} />}
    </div>
  );
});
export default Checkbox;
