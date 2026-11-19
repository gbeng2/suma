import ProgressBar from "./ProgressBar.tsx";

interface ProgressStepHeaderProps {
  step: number;
  steps: number;
}

/** A Figma "ProgressBar" with the "Step 2 of 5" label filled in. */
export default function ProgressStepHeader({ step, steps }: ProgressStepHeaderProps) {
  return (
    <ProgressBar
      value={Math.ceil((step / steps) * 100)}
      label={`Step ${step} of ${steps}`}
    />
  );
}
