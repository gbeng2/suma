import { RoutePath } from "../../routing/RoutePath.ts";
import { ThemeColor } from "../../types/theme";
import { DashboardApiData, DashboardNotInApiYet } from "../fixtures/dashboard.ts";
import alertText from "./alertStrings.ts";

/**
 * The "mapping layer" of the Dashboard.
 * Read docs/02-fixtures-and-real-data.md first: it explains the idea.
 *
 *   API data  ->  toDashboardProps()  ->  props for <DashboardView>
 *
 * API data is shaped for the backend. The view wants data shaped for the screen.
 * This file is the ONE place that knows both shapes. It has no React and no
 * fetching, so it is easy to read and easy to test (see toDashboardProps.test.ts).
 */

/** One alert, ready to draw. */
export interface DashboardAlertView {
  /** Unique within the list. Used as the React key. */
  id: string;
  /** Color family of the alert. */
  color: ThemeColor;
  icon: "info" | "prohibit";
  title: string;
  text?: string;
  /** Where the alert goes when tapped. No `to` means it is not a link. */
  to?: RoutePath;
}

/** One program row, ready to draw. */
export interface DashboardProgramView {
  id: string;
  name: string;
  description: string;
  /** null when the program has no image. */
  imageUrl: string | null;
  imageAlt: string;
  /** null when the program has no link: then no button is shown. */
  buttonLabel: string | null;
  to: string | null;
}

/** Everything <DashboardView> needs. */
export interface DashboardViewProps {
  alerts: DashboardAlertView[];
  /** Money the member did not have to pay, in cents. 0 shows the empty savings card. */
  savedCents: number;
  /** Money the member paid, in cents. null hides the comparison bar. */
  paidCents: number | null;
  programs: DashboardProgramView[];
}

export default function toDashboardProps(
  api: DashboardApiData,
  notInApiYet: DashboardNotInApiYet
): DashboardViewProps {
  return {
    alerts: toAlerts(api, notInApiYet),
    savedCents: api.ledgers.lifetimeSavings.cents,
    paidCents: notInApiYet.paidCents,
    programs: api.dashboard.programs.map(toProgram),
  };
}

/**
 * Builds the alert list.
 *
 * Alerts come from two places:
 * 1. The client decides, from the member (`user`). These rules are copied from
 *    `TopAlerts` in src/components/Dashboard.tsx. Keep the two in step.
 * 2. The server decides, and sends them in `dashboard.alerts`.
 *
 * Order matters: most urgent first.
 */
function toAlerts(
  { user, dashboard }: DashboardApiData,
  notInApiYet: DashboardNotInApiYet
): DashboardAlertView[] {
  const alerts: DashboardAlertView[] = [];

  // 2. Server alerts first: they are about money and access.
  for (const a of dashboard.alerts || []) {
    const color = toColor(a.variant);
    alerts.push({
      id: a.localizationKey,
      color,
      icon: color === "danger" ? "prohibit" : "info",
      ...alertText(a.localizationKey, a.localizationParams),
      to: serverAlertLinks[a.localizationKey],
    });
  }

  // 1. Client alerts.
  if (user.ongoingTrip) {
    alerts.push({
      id: "ongoing-trip",
      color: "danger",
      icon: "prohibit",
      ...alertText("dashboard.check_ongoing_trip"),
      to: "/mobility",
    });
  }
  if (user.readOnlyReason === "read_only_unverified") {
    alerts.push({
      id: "unverified",
      color: "danger",
      icon: "prohibit",
      ...alertText("read_only_unverified"),
    });
  }
  if (user.unclaimedOrdersCount > 0) {
    alerts.push({
      id: "unclaimed-orders",
      color: "primary",
      icon: "info",
      ...alertText("dashboard.claim_orders"),
      // The API gives only a count. The second line comes from `notInApiYet`.
      text: notInApiYet.unclaimedOrderSummary ?? undefined,
      to: "/unclaimed-orders",
    });
  }
  if (user.registrationLink) {
    alerts.push({
      id: "partner-signup",
      color: "success",
      icon: "info",
      ...alertText("dashboard.partner_signup_available", {
        organization: user.registrationLink.organizationName,
      }),
      to: "/partner-signup",
    });
  }
  return alerts;
}

/**
 * Where a server alert goes when tapped.
 * ASSUMPTION: the API sends no link with an alert, and the app today shows server
 * alerts as plain text. Figma draws them as links, so the link is chosen here by key.
 * See docs/05-open-questions.md.
 */
const serverAlertLinks: Record<string, RoutePath | undefined> = {
  "dashboard.negative_cash_balance_v2": "/funding",
};

const themeColors: ThemeColor[] = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "danger",
];

/** The API sends `variant` as a plain string. Unknown values fall back to "primary". */
function toColor(variant: string): ThemeColor {
  return themeColors.includes(variant as ThemeColor)
    ? (variant as ThemeColor)
    : "primary";
}

function toProgram(p: Program, index: number): DashboardProgramView {
  const hasLink = Boolean(p.appLink && p.appLinkText);
  return {
    // `Program` has no id in the API, and names can repeat, so the index is added.
    id: `${index}-${p.name}`,
    name: p.name,
    description: p.description,
    imageUrl: p.image?.url ?? null,
    imageAlt: p.image?.caption ?? "",
    buttonLabel: hasLink ? p.appLinkText : null,
    to: hasLink ? p.appLink : null,
  };
}
