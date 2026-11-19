import Progress from "./Progress.tsx";
import "./ProgressStepHeader.css";
import Stack from "./Stack.tsx";

interface ProgressStepHeaderProps {
  step: number;
  steps: number;
}

export default function ProgressStepHeader({ step, steps }: ProgressStepHeaderProps) {
  return (
    <Stack row center gap={4}>
      <div className="flex-1">
        <Progress value={Math.ceil((step / steps) * 100)} />
      </div>
      <p className="progress-step-header-label">
        Step {step} of {steps}
      </p>
    </Stack>
  );
}
