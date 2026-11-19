import useId from "../../state/useId.ts";
import Checkbox, { CheckboxProps } from "./Checkbox.tsx";
import "./CheckboxRow.css";
import InputFeedback from "./InputFeedback.tsx";
import OptionBody from "./OptionBody.tsx";
import clsx from "clsx";
import React from "react";

export interface CheckboxRowProps extends Omit<CheckboxProps, "label" | "noFeedback"> {
  label: React.ReactNode;
  /** Figma "meta": the muted line under the label. */
  meta?: React.ReactNode;
}

/** Figma "CheckboxRow": a Checkbox with a label and a muted line. The whole row is clickable. */
const CheckboxRow = React.forwardRef<HTMLInputElement, CheckboxRowProps>(
  function CheckboxRow({ label, meta, id, error, help, className, ...rest }, ref) {
    const inputId = useId(id);
    return (
      <div className={className}>
        <label className={clsx("checkbox-row")}>
          <Checkbox ref={ref} id={inputId} error={error} {...rest} />
          <OptionBody title={label} text={meta} />
        </label>
        {/* `error={true}` shows only the error look, with no message. */}
        <InputFeedback
          inputId={inputId}
          error={error === true ? null : error}
          help={help}
        />
      </div>
    );
  }
);
export default CheckboxRow;
