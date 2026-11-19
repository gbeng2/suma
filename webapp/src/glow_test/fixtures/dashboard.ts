import programHolidaySpecial from "../assets/program-holiday-special.png";

/**
 * Fixture data for the Dashboard prototype (pages/Dashboard.tsx).
 * The shapes here are what the page needs, NOT the real API shapes.
 * When porting to the real app, map the API response to these props.
 */

export interface DashboardAlert {
  id: string;
  /** Color family of the alert. "danger" = urgent, "primary" = notice. */
  color: "danger" | "primary";
  icon: "prohibit" | "info";
  title: string;
  text: string;
  to: string;
}

export interface DashboardSavings {
  /** Money the member did not have to pay, in cents. */
  savedCents: number;
  /** Money the member paid, in cents. */
  paidCents: number;
}

export interface DashboardProgram {
  id: number;
  name: string;
  description: string;
  image: string;
  buttonLabel: string;
  to: string;
}

export interface DashboardData {
  alerts: DashboardAlert[];
  /** null when the member has not saved anything yet. */
  savings: DashboardSavings | null;
  programs: DashboardProgram[];
}

const alerts: DashboardAlert[] = [
  {
    id: "negative-balance",
    color: "danger",
    icon: "prohibit",
    title: "Your balance is -$50.",
    text: "Please pay to regain access.",
    to: "/funding",
  },
  {
    id: "order-ready",
    color: "primary",
    icon: "info",
    title: "Your order is ready",
    text: "Holiday Demo · 1 item",
    to: "/unclaimed-orders",
  },
];

const savings: DashboardSavings = { savedCents: 36260, paidCents: 8840 };

const programs: DashboardProgram[] = [1, 2, 3].map((id) => ({
  id,
  name: "Holiday Special",
  description: "A holiday dinner for 4–6 for $10. Normally $180.",
  image: programHolidaySpecial,
  buttonLabel: "Explore deals",
  to: "/food",
}));

/** The four page states in Figma. Pick one with ?state=<key>. */
export const dashboardStates = {
  /** Figma 2513:4304. An urgent alert and a notice. */
  default: { alerts, savings, programs },
  /** Figma 2513:4309. Nothing needs attention. */
  no_alerts: { alerts: [], savings, programs },
  /** Figma 2513:4314. Member hasn't saved anything yet. */
  no_savings: { alerts: [], savings: null, programs },
  /** Figma 2750:29004. No available programs. */
  no_programs: { alerts: [], savings: null, programs: [] },
} satisfies Record<string, DashboardData>;

export type DashboardStateKey = keyof typeof dashboardStates;

/** Fixture for the OnboardingVerificationStatusCard (Figma 1737:6293). */
export const verificationFixture = {
  badge: "IN REVIEW · Aug 7, 2026",
  title: "We’re verifying your details",
  text: "Our staff is verifying your details with your affiliate organization. We will message you when we’ve confirmed.",
  supportText: "Call or text (503) 555-0142 · 9am – 5pm, Monday to Friday",
};
