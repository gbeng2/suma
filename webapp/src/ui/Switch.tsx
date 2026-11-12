import useId from "../state/useId.ts";
import { InputFeedbackError } from "./InputFeedback.tsx";
import "./Switch.css";
import clsx from "clsx";
import React from "react";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  checked: boolean;
  error?: React.ReactNode;
  name?: string;
  disabled?: boolean;
  inputClass?: string;
}

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
  const errorId = error ? `${inputId}-error` : undefined;
  return (
    <div className={className}>
      <label className={clsx("form-switch", error && "is-invalid")}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          name={name}
          checked={checked}
          disabled={disabled}
          className={clsx(inputClass, error && "is-invalid")}
          {...rest}
        />
        <span className="form-switch-track">
          <span className="form-switch-thumb" />
        </span>
        <span>{label}</span>
      </label>
      {error && <InputFeedbackError id={errorId}>{error}</InputFeedbackError>}
    </div>
  );
});
export default Switch;
