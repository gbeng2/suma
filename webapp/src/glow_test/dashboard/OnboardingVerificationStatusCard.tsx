import Button from "../components/Button.tsx";
import "./OnboardingVerificationStatusCard.css";
import { MouseEventHandler } from "react";

export interface OnboardingVerificationStatusCardProps {
  /** Small pill at the top, like "IN REVIEW · Aug 7, 2026". */
  badge: string;
  title: string;
  text: string;
  buttonLabel?: string;
  onContactSupport?: MouseEventHandler;
  /** Line under the button, like the support phone number and hours. */
  supportText?: string;
}

/**
 * Figma "OnboardingVerificationStatusCard" (1737:6293).
 * NOTE: the designer marked this node as a TODO ("this is messed up") in Figma,
 * so expect the design to change. Figma positions the two blocks absolutely in a
 * fixed 335x444 card; here they are stacked with flex so the text can grow.
 */
export default function OnboardingVerificationStatusCard({
  badge,
  title,
  text,
  buttonLabel = "Contact support",
  onContactSupport,
  supportText,
}: OnboardingVerificationStatusCardProps) {
  return (
    <div className="verification-card">
      <div className="verification-card-top">
        <span className="verification-card-badge">{badge}</span>
        <h2 className="verification-card-title">{title}</h2>
        <p className="verification-card-text">{text}</p>
      </div>
      <div className="verification-card-actions">
        <Button className="verification-card-button" onClick={onContactSupport}>
          {buttonLabel}
        </Button>
        {supportText && <p className="verification-card-support">{supportText}</p>}
      </div>
    </div>
  );
}
