import useId from "../../state/useId.ts";
import { Check } from "../icons";
import "./CheckableCard.css";
import InputFeedback, { HasInputFeedback } from "./InputFeedback.tsx";
import clsx from "clsx";
import React from "react";

export interface CheckableCardProps
  extends HasInputFeedback,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "title"> {
  checked: boolean;
  /** Figma "initials": shown in the logo tile, like "AH". */
  initials?: React.ReactNode;
  /** Figma "name". */
  title?: React.ReactNode;
  /** Figma "meta": the muted line under the title. */
  text?: React.ReactNode;
  name?: string;
  disabled?: boolean;
  /** Class for the card. The gallery uses "is-hover" and "is-focus-visible". */
  className?: string;
  style?: React.CSSProperties;
  /** Custom content, shown after initials/title/text. */
  children?: React.ReactNode;
}

/**
 * Figma "CheckableCard": a card that works as a checkbox.
 * Figma state=Selected is `checked`, Error is the `error` prop, Disabled is `disabled`.
 */
const CheckableCard = React.forwardRef<HTMLInputElement, CheckableCardProps>(
  function CheckableCard(
    {
      id,
      checked,
      initials,
      title,
      text,
      name,
      disabled = false,
      className,
      style,
      help,
      error,
      children,
      ...rest
    }: CheckableCardProps,
    ref
  ) {
    const inputId = useId(id);
    const cls = clsx("checkable-card", error && "is-invalid", className);
    return (
      <div className="checkable-card-group">
        <label className={cls} style={style}>
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            name={name}
            checked={checked}
            disabled={disabled}
            aria-describedby={InputFeedback.idFor(inputId)}
            aria-invalid={error ? true : undefined}
            {...rest}
          />
          {initials && <span className="checkable-card-logo">{initials}</span>}
          {(title || text) && (
            <span className="checkable-card-body">
              {title && <span className="checkable-card-title">{title}</span>}
              {text && <span className="checkable-card-text">{text}</span>}
            </span>
          )}
          {children}
          <Check className="checkable-card-check" />
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
export default CheckableCard;
