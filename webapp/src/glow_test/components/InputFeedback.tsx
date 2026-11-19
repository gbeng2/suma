import Icon from "./Icon.tsx";
import ErrorIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import React from "react";

export interface HasInputFeedback {
  help?: React.ReactNode;
  error?: React.ReactNode;
}

interface InputFeedbackProps extends HasInputFeedback {
  inputId: string;
}

/**
 * Render the error, or form feedback if no error.
 */
export default function InputFeedback({ inputId, help, error }: InputFeedbackProps) {
  const describedBy = InputFeedback.idFor(inputId);
  if (error) {
    return <InputFeedbackError id={describedBy}>{error}</InputFeedbackError>;
  }
  if (help) {
    return (
      <div id={describedBy} className="form-text">
        {help}
      </div>
    );
  }
  return null;
}

InputFeedback.idFor = (inputId: string) => `${inputId}-feedback`;

interface InputFeedbackErrorProps {
  id?: string;
  children: React.ReactNode;
}

export function InputFeedbackError({ id, children }: InputFeedbackErrorProps) {
  return (
    <div id={id} className="form-text invalid-feedback" role="alert">
      <Icon icon={ErrorIcon} size={20} color="danger" />
      {children}
    </div>
  );
}
