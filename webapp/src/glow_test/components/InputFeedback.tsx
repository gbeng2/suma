import { WarningCircle } from "../icons";
import "./InputFeedback.css";
import React from "react";

export interface HasInputFeedback {
  help?: React.ReactNode;
  error?: React.ReactNode;
}

interface InputFeedbackProps extends HasInputFeedback {
  inputId: string;
  /** Figma "icon". Set to false to show only the text. */
  icon?: boolean;
}

/**
 * Figma "InputFeedback": the line under a form field.
 * Render the error (kind=Error), or the help text (kind=Help) if there is no error.
 */
export default function InputFeedback({
  inputId,
  help,
  error,
  icon = true,
}: InputFeedbackProps) {
  const describedBy = InputFeedback.idFor(inputId);
  if (error) {
    return (
      <InputFeedbackError id={describedBy} icon={icon}>
        {error}
      </InputFeedbackError>
    );
  }
  if (help) {
    return (
      <div id={describedBy} className="input-feedback">
        {icon && <WarningCircle className="input-feedback-icon" />}
        {help}
      </div>
    );
  }
  return null;
}

InputFeedback.idFor = (inputId: string) => `${inputId}-feedback`;

interface InputFeedbackErrorProps {
  id?: string;
  icon?: boolean;
  children: React.ReactNode;
}

export function InputFeedbackError({
  id,
  icon = true,
  children,
}: InputFeedbackErrorProps) {
  return (
    <div id={id} className="input-feedback input-feedback-error" role="alert">
      {icon && <WarningCircle className="input-feedback-icon" />}
      {children}
    </div>
  );
}
