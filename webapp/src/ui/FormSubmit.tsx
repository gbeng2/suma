import { FeedbackValue } from "../modules/feedback.ts";
import Button, { ButtonProps } from "./Button.tsx";
import ButtonGroup from "./ButtonGroup.tsx";
import FormFeedback from "./FormFeedback.tsx";
import Stack from "./Stack.tsx";
import React from "react";

interface LabeledButtonProps extends ButtonProps {
  label?: string;
}

export interface FormSubmitProps {
  /** Label for the primary button. */
  label?: React.ReactNode;
  feedback?: FeedbackValue | null;
  primary?: LabeledButtonProps;
  secondary?: LabeledButtonProps;
}

export default function FormSubmit({ label, primary, feedback }: FormSubmitProps) {
  primary = { children: label, type: "submit", ...primary };
  return (
    <Stack col gap={3} style={{ marginTop: "auto" }}>
      <FormFeedback feedback={feedback} />
      <ButtonGroup col bottom>
        <Button {...primary} />
      </ButtonGroup>
    </Stack>
  );
}
