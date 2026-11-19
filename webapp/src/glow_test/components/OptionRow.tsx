import { Plus } from "../icons";
import OptionBody from "./OptionBody.tsx";
import "./OptionRow.css";
import Radio, { RadioProps } from "./Radio.tsx";
import clsx from "clsx";
import React from "react";

export interface OptionRowProps extends Omit<RadioProps, "title"> {
  title: React.ReactNode;
  /** The muted line under the title. If the row is disabled, use it to say why. */
  text?: React.ReactNode;
  /** Figma "divider": a line at the top of the row. */
  divider?: boolean;
}

/**
 * Figma "OptionRow" type=Off/On/Disabled: a Radio with a title and a muted line.
 * The whole row is clickable. Off/On is `checked`, Disabled is `disabled`.
 * For a group of rows in a card, use RadioCard.
 */
const OptionRow = React.forwardRef<HTMLInputElement, OptionRowProps>(function OptionRow(
  { title, text, divider, className, ...rest },
  ref
) {
  return (
    <label className={clsx("option-row", divider && "option-row-divider", className)}>
      <Radio ref={ref} {...rest} />
      <OptionBody title={title} text={text} />
    </label>
  );
});
export default OptionRow;

export interface OptionRowAddProps {
  children: React.ReactNode;
  divider?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/** Figma "OptionRow" type=Add: a button at the end of a list of rows, like "Add a card". */
export function OptionRowAdd({
  children,
  divider,
  className,
  onClick,
}: OptionRowAddProps) {
  return (
    <button
      type="button"
      className={clsx(
        "option-row option-row-add",
        divider && "option-row-divider",
        className
      )}
      onClick={onClick}
    >
      <span className="option-row-add-icon">
        <Plus size={18} />
      </span>
      {children}
    </button>
  );
}
