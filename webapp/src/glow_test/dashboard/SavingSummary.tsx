import Card from "../components/Card.tsx";
import CardBody from "../components/CardBody.tsx";
import "./SavingSummary.css";
import formatMoney from "./formatMoney.ts";
import clsx from "clsx";

export interface SavingSummaryProps {
  /** Money the member did not have to pay, in cents. */
  savedCents?: number;
  /**
   * Money the member paid, in cents.
   * With null, the comparison bar and legend are hidden (the API has no such value yet).
   */
  paidCents?: number | null;
}

/**
 * Figma "SavingSummary" (2030:17886).
 * With no savings (savedCents is 0 or missing) it shows the Figma
 * "Savings Summary · Empty" variant.
 */
export default function SavingSummary({
  savedCents = 0,
  paidCents = 0,
}: SavingSummaryProps) {
  if (savedCents <= 0) {
    return (
      <Card className="saving-summary-card">
        <CardBody className="saving-summary saving-summary-empty">
          <h2 className="saving-summary-empty-title">Your savings start here</h2>
          <p className="saving-summary-text">
            Join a program to unlock offers on everyday essentials.
          </p>
        </CardBody>
      </Card>
    );
  }
  return (
    <Card className="saving-summary-card">
      <CardBody className="saving-summary">
        <p className="saving-summary-label">You’ve saved</p>
        <p className="saving-summary-amount">{formatMoney(savedCents)}</p>
        <p className="saving-summary-text">
          Money you didn’t have to pay, compared with regular prices.
        </p>
        {paidCents !== null && <Compare savedCents={savedCents} paidCents={paidCents} />}
      </CardBody>
    </Card>
  );
}

/** The bar and legend that compare "Saved" with "You paid". */
function Compare({ savedCents, paidCents }: { savedCents: number; paidCents: number }) {
  // How much of the regular price the member did not pay, like 80 (%).
  const savedPercent = (savedCents / (savedCents + paidCents)) * 100;
  return (
    <div className="saving-summary-compare">
      <div className="saving-summary-bar" aria-hidden="true">
        <div className="saving-summary-bar-saved" style={{ width: `${savedPercent}%` }} />
      </div>
      <div className="saving-summary-legend">
        <LegendItem kind="saved" label="Saved" value={formatMoney(savedCents)} />
        <LegendItem kind="paid" label="You paid" value={formatMoney(paidCents)} />
      </div>
    </div>
  );
}

interface LegendItemProps {
  kind: "saved" | "paid";
  label: string;
  value: string;
}

function LegendItem({ kind, label, value }: LegendItemProps) {
  return (
    <div className="saving-summary-legend-item">
      <span className="saving-summary-legend-label">
        <span className={clsx("saving-summary-dot", `saving-summary-dot-${kind}`)} />
        {label}
      </span>
      <span className="saving-summary-legend-value">{value}</span>
    </div>
  );
}
