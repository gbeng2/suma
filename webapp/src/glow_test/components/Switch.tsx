import useId from "../../state/useId.ts";
import { InputFeedbackError } from "./InputFeedback.tsx";
import "./Switch.css";
import clsx from "clsx";
import React from "react";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Without a label, only the 50x28 control is rendered (Figma "Switch"). */
  label?: React.ReactNode;
  checked: boolean;
  /** Figma state=Error. A message is shown under the switch, `true` shows only the look. */
  error?: React.ReactNode;
  name?: string;
  disabled?: boolean;
  inputClass?: string;
}

/**
 * Figma "Switch".
 * Focus is the browser focus (`inputClass="is-focus-visible"` forces it in the gallery).
 */
const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    id,
    label,
    checked,
    error,
    name,
    disabled = false,
    className,
    inputClass,
    ...rest
  }: SwitchProps,
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorMessage = error === true ? null : error;
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const control = (
    <span className={clsx("switch", !label && className)}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        name={name}
        checked={checked}
        disabled={disabled}
        className={clsx("switch-input", inputClass)}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...rest}
      />
      <span className="switch-knob" />
    </span>
  );
  if (!label) {
    return control;
  }
  return (
    <div className={className}>
      <label className="form-switch">
        {control}
        <span>{label}</span>
      </label>
      {errorMessage && (
        <InputFeedbackError id={errorId}>{errorMessage}</InputFeedbackError>
      )}
    </div>
  );
});
export default Switch;
