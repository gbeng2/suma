import OptionBody from "./OptionBody.tsx";
import Switch, { SwitchProps } from "./Switch.tsx";
import "./SwitchRow.css";
import clsx from "clsx";
import React from "react";

export interface SwitchRowProps extends Omit<SwitchProps, "label" | "title"> {
  title: React.ReactNode;
  /** Figma "note": the muted line under the title. */
  text?: React.ReactNode;
  checked: boolean;
}

/** Figma "OptionRow/SwitchRow": a title and note, with a Switch at the end. The whole row is clickable. */
const SwitchRow = React.forwardRef<HTMLInputElement, SwitchRowProps>(function SwitchRow(
  { title, text, className, ...rest },
  ref
) {
  return (
    <label className={clsx("switch-row", className)}>
      <OptionBody title={title} text={text} />
      <Switch ref={ref} {...rest} />
    </label>
  );
});
export default SwitchRow;
