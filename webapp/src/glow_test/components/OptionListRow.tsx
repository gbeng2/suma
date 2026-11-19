import { Check } from "../icons";
import OptionBody from "./OptionBody.tsx";
import "./OptionListRow.css";
import "./forms.css";
import clsx from "clsx";
import React from "react";

export interface OptionListRowProps {
  title: React.ReactNode;
  /** Figma "hint": the muted line under the title. */
  hint?: React.ReactNode;
  selected: boolean;
  /** Called when the user picks this row. */
  onSelect?: () => void;
  /** Rows of one list share the same name, so only one can be selected. */
  name: string;
  value?: string;
  /** Figma "divider": a line at the top of the row (never shown on the selected row). */
  divider?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Figma "OptionListRow": one choice in a settings list (like theme or contrast).
 * It is a radio button: the selected row gets a border and a check.
 * Put the rows inside an `OptionList`.
 */
export default function OptionListRow({
  title,
  hint,
  selected,
  onSelect,
  name,
  value,
  divider = true,
  disabled,
  className,
}: OptionListRowProps) {
  return (
    <label
      className={clsx("option-list-row", divider && "option-list-row-divider", className)}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        disabled={disabled}
        onChange={onSelect}
      />
      <OptionBody title={title} text={hint} />
      {selected && <Check className="option-list-row-check" size={24} />}
    </label>
  );
}

export interface OptionListProps {
  /** Label above the list, like "Contrast". */
  legend?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/** Figma "Option list": the rounded box around OptionListRows. */
export function OptionList({ legend, className, children }: OptionListProps) {
  return (
    <fieldset className={clsx("option-list-group", className)}>
      {legend && <legend className="form-label">{legend}</legend>}
      <div className="option-list">{children}</div>
    </fieldset>
  );
}
