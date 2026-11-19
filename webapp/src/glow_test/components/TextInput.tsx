import useId from "../../state/useId";
import InputFeedback, { HasInputFeedback } from "./InputFeedback.tsx";
import "./forms.css";
import clsx from "clsx";
import React from "react";

export interface TextInputProps
  extends HasInputFeedback,
    Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      "prefix"
    > {
  label: React.ReactNode;
  /** Figma "optional": shows "Optional" next to the label. */
  optional?: boolean;
  /** Text for the "optional" mark. Pass a translated string in the real app. */
  optionalLabel?: React.ReactNode;
  /** Shown inside the field, before the input. Like the "+1" of PhoneInput. */
  prefix?: React.ReactNode;
  /** Class for the field. The gallery uses "is-hover" and "is-focus-visible". */
  inputClass?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Figma "TextInput": label row, input field, and InputFeedback under it.
 * The look of the field and its states (Hover/Focus/Error/Disabled) is in forms.css.
 * Figma value=Empty/Filled is just the input with or without a value.
 */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    label,
    optional,
    optionalLabel = "Optional",
    prefix,
    help,
    error,
    id,
    className,
    inputClass,
    required = false,
    disabled = false,
    ...rest
  }: TextInputProps,
  ref
) {
  const inputId = useId(id);
  const inputProps = {
    ref,
    id: inputId,
    required,
    disabled,
    "aria-describedby": InputFeedback.idFor(inputId),
    "aria-invalid": error ? true : undefined,
    ...rest,
  };
  return (
    <div className={clsx("form-group", className)}>
      <label className="form-label" htmlFor={inputId}>
        {label}
        {optional && <span className="form-label-optional">{optionalLabel}</span>}
      </label>
      {prefix ? (
        // With a prefix, the wrapper is the visible field and the input has no border.
        <div className={clsx("input-field", inputClass)}>
          <span className="input-field-prefix">{prefix}</span>
          <input {...inputProps} />
        </div>
      ) : (
        <input className={clsx("form-control", inputClass)} {...inputProps} />
      )}
      <InputFeedback inputId={inputId} help={help} error={error} />
    </div>
  );
});
export default TextInput;
