import useId from "../../state/useId";
import { CaretDown } from "../icons";
import InputFeedback, { HasInputFeedback } from "./InputFeedback.tsx";
import "./Select.css";
import "./forms.css";
import clsx from "clsx";
import React from "react";

export interface SelectOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
}

export interface SelectProps<T extends string = string>
  extends HasInputFeedback,
    React.InputHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  options: SelectOption<T>[];
  value?: T;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  /** Make the select as wide as its value, and not the full width. */
  fit?: boolean;
  /** Class for the select. The gallery uses "is-hover" and "is-focus-visible". */
  inputClass?: string;
}

interface SelectComponent {
  <T extends string = string>(
    props: SelectProps<T> & { ref?: React.Ref<HTMLSelectElement> }
  ): React.ReactElement | null;
}

/**
 * Figma "Select": label row, a native select styled like TextInput, and InputFeedback.
 * Figma value=Empty is `value=""` with a `placeholder`.
 */
const Select = React.forwardRef(function Select<T extends string = string>(
  {
    label,
    options,
    value,
    help,
    error,
    placeholder,
    name,
    required = false,
    disabled = false,
    id,
    fit,
    inputClass,
    className,
    ...rest
  }: SelectProps<T>,
  ref: React.Ref<HTMLSelectElement>
) {
  const selectId = useId(id);
  return (
    <div className={clsx("form-group", className)}>
      {label && (
        <label className="form-label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className={clsx("select-wrapper", fit && "select-fit")}>
        <select
          ref={ref}
          id={selectId}
          name={name}
          className={inputClass}
          value={value}
          required={required}
          disabled={disabled}
          aria-describedby={InputFeedback.idFor(selectId)}
          aria-invalid={error ? true : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <CaretDown className="select-arrow" />
      </div>
      <InputFeedback inputId={selectId} help={help} error={error} />
    </div>
  );
}) as SelectComponent;
export default Select;
