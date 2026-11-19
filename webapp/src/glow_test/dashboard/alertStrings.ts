import formatMoney from "./formatMoney.ts";

/**
 * English text for dashboard alerts.
 *
 * PROTOTYPE ONLY. The real app gets text from the localization system:
 * `t(localizationKey, localizationParams)`, with strings stored on the backend
 * in English and Spanish. The prototype has no i18n provider, so the strings
 * live here, under the same keys.
 *
 * The Figma alert has a bold title AND a muted second line. Today each key has
 * ONE string. So every key below needs a second string added on the backend
 * (see docs/05-open-questions.md).
 */

export interface AlertText {
  title: string;
  text?: string;
}

type AlertTextBuilder = (params: Record<string, unknown>) => AlertText;

const strings: Record<string, AlertTextBuilder> = {
  "dashboard.negative_cash_balance_v2": (params) => ({
    title: `Your balance is ${formatMoney((params.amount as Money).cents, {
      trimZeroCents: true,
    })}.`,
    text: "Please pay to regain access.",
  }),
  "dashboard.claim_orders": () => ({ title: "Your order is ready" }),
  "dashboard.check_ongoing_trip": () => ({
    title: "You have a trip in progress",
    text: "Open the map to end it.",
  }),
  "dashboard.partner_signup_available": (params) => ({
    title: `Sign up with ${params.organization}`,
    text: "You are eligible for more programs.",
  }),
  read_only_unverified: () => ({
    title: "We’re verifying your details",
    text: "Some features are off until we finish.",
  }),
};

/** Text for a localization key. An unknown key shows the key itself, like `t()` does. */
export default function alertText(
  key: string,
  params: Record<string, unknown> = {}
): AlertText {
  const build = strings[key];
  return build ? build(params) : { title: key };
}
