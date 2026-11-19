import "./Radio.css";
import clsx from "clsx";
import React from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Figma state=Error. */
  error?: boolean;
  inputClass?: string;
}

/**
 * Figma "Radio": only the 22px control, with no label.
 * Use OptionRow or RadioCard for a radio with text.
 * Focus is the browser focus (`inputClass="is-focus-visible"` forces it in the gallery).
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { error, className, inputClass, ...rest },
  ref
) {
  return (
    <span className={clsx("radio", className)}>
      <input
        ref={ref}
        type="radio"
        className={clsx("radio-input", inputClass)}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      <span className="radio-dot" />
    </span>
  );
});
export default Radio;
