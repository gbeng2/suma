import programHolidaySpecial from "../assets/program-holiday-special.png";
import { currentMember, dashboard, ledgersOverview, money, program } from "./builders.ts";

/**
 * Fixture data for the Dashboard prototype.
 * Read docs/02-fixtures-and-real-data.md first: it explains the idea.
 *
 * The data here has the SAME SHAPE as what the real API returns.
 * The page never reads it directly. It goes through `toDashboardProps`
 * (dashboard/toDashboardProps.ts), exactly as real API data will later.
 */

/**
 * Everything the Dashboard needs from the backend.
 * Each field is the response of one real endpoint or provider:
 */
export interface DashboardApiData {
  /** From `useUser()` (state/useUser.ts). */
  user: CurrentMember;
  /** From `api.dashboard`, GET /api/v1/me/dashboard. */
  dashboard: Dashboard;
  /** From `api.getLedgersOverview`. Only `lifetimeSavings` is used. */
  ledgers: LedgersView;
}

/**
 * Values the Figma design shows that the API does NOT return today.
 * They are kept apart on purpose, so the gaps stay visible.
 * Each one needs backend work or a design change before the real page can ship.
 * See docs/05-open-questions.md.
 */
export interface DashboardNotInApiYet {
  /**
   * "You paid" in the savings card. The API has `lifetimeSavings` but no total paid.
   * null hides the comparison bar.
   */
  paidCents: number | null;
  /**
   * Second line of the "Your order is ready" alert, like "Holiday Demo · 1 item".
   * The API only gives `user.unclaimedOrdersCount`.
   */
  unclaimedOrderSummary: string | null;
}

export interface DashboardFixture {
  api: DashboardApiData;
  notInApiYet: DashboardNotInApiYet;
}

const image: Image = {
  url: programHolidaySpecial,
  caption: "A holiday dinner on a table",
};
const programs = [program({ image }), program({ image }), program({ image })];

/** The server sends this alert when the member's cash balance is negative. */
const negativeBalanceAlert: DashboardAlert = {
  localizationKey: "dashboard.negative_cash_balance_v2",
  localizationParams: { amount: money(-5000) },
  variant: "danger",
};

/** The four page states in Figma. Pick one with ?state=<key>. */
export const dashboardStates = {
  /** Figma 2513:4304. An urgent alert and a notice. */
  default: {
    api: {
      user: currentMember({ unclaimedOrdersCount: 1 }),
      dashboard: dashboard({
        cashBalance: money(-5000),
        programs,
        alerts: [negativeBalanceAlert],
      }),
      ledgers: ledgersOverview({ lifetimeSavings: money(36260) }),
    },
    notInApiYet: { paidCents: 8840, unclaimedOrderSummary: "Holiday Demo · 1 item" },
  },
  /** Figma 2513:4309. Nothing needs attention. */
  no_alerts: {
    api: {
      user: currentMember(),
      dashboard: dashboard({ programs }),
      ledgers: ledgersOverview({ lifetimeSavings: money(36260) }),
    },
    notInApiYet: { paidCents: 8840, unclaimedOrderSummary: null },
  },
  /** Figma 2513:4314. Member hasn't saved anything yet. */
  no_savings: {
    api: {
      user: currentMember(),
      dashboard: dashboard({ programs }),
      ledgers: ledgersOverview({ lifetimeSavings: money(0) }),
    },
    notInApiYet: { paidCents: null, unclaimedOrderSummary: null },
  },
  /** Figma 2750:29004. No available programs. */
  no_programs: {
    api: {
      user: currentMember(),
      dashboard: dashboard(),
      ledgers: ledgersOverview({ lifetimeSavings: money(0) }),
    },
    notInApiYet: { paidCents: null, unclaimedOrderSummary: null },
  },
} satisfies Record<string, DashboardFixture>;

export type DashboardStateKey = keyof typeof dashboardStates;

/** Fixture for the OnboardingVerificationStatusCard (Figma 1737:6293). Not API-shaped yet. */
export const verificationFixture = {
  badge: "IN REVIEW · Aug 7, 2026",
  title: "We’re verifying your details",
  text: "Our staff is verifying your details with your affiliate organization. We will message you when we’ve confirmed.",
  supportText: "Call or text (503) 555-0142 · 9am – 5pm, Monday to Friday",
};
