import useId from "../../state/useId";
import { Direction } from "../../types/direction.ts";
import InputFeedback, { HasInputFeedback } from "./InputFeedback.tsx";
import OptionRow from "./OptionRow.tsx";
import "./RadioCard.css";
import "./forms.css";
import clsx from "clsx";
import React from "react";

export interface RadioOption<T extends string = string> {
  value: T;
  /** The title of the row. */
  label: React.ReactNode;
  /** The muted line under the title. */
  text?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioCardProps<T extends string = string> extends HasInputFeedback {
  /** Shared name so the browser treats these as one mutually-exclusive group */
  name: string;
  /** Accessible group label, rendered as the fieldset's <legend> */
  legend?: string;
  options: RadioOption<T>[];
  value: T | null | undefined;
  onValueChange: (value: T) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  optionClass?: string;
  style?: React.CSSProperties;
  /** Figma "direction". */
  direction?: Direction;
}

interface RadioCardComponent {
  <T extends string = string>(
    props: RadioCardProps<T> & { ref?: React.Ref<HTMLFieldSetElement> }
  ): React.ReactElement | null;
}

/**
 * Figma "RadioCard": a card with one OptionRow (a Radio with text) per option.
 * Figma error=On is the `error` prop: the card and the radios get the error color,
 * and the message is shown under the card.
 */
const RadioCard = React.forwardRef(function RadioCard<T extends string = string>(
  {
    name,
    legend,
    options,
    value,
    onValueChange,
    disabled = false,
    required = false,
    error,
    help,
    className,
    optionClass,
    style,
    direction = "vertical",
  }: RadioCardProps<T>,
  ref: React.Ref<HTMLFieldSetElement>
) {
  const groupId = useId();
  return (
    <fieldset
      ref={ref}
      className="form-group radio-card-group"
      aria-describedby={InputFeedback.idFor(groupId)}
    >
      {legend && <legend className="form-label">{legend}</legend>}
      <div
        className={clsx(
          "card radio-card",
          `radio-card-${direction}`,
          error && "is-invalid",
          className
        )}
        style={style}
      >
        {options.map((option) => (
          <OptionRow
            key={option.value}
            className={optionClass}
            name={name}
            value={option.value}
            title={option.label}
            text={option.text}
            checked={value === option.value}
            disabled={disabled || option.disabled}
            required={required}
            error={Boolean(error)}
            onChange={() => onValueChange(option.value)}
          />
        ))}
      </div>
      {/* `error={true}` shows only the error look, with no message. */}
      <InputFeedback
        inputId={groupId}
        error={error === true ? null : error}
        help={help}
      />
    </fieldset>
  );
}) as RadioCardComponent;
export default RadioCard;
