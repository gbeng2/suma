/**
 * Builders for API-shaped fixture data.
 *
 * A "builder" is a function that returns one complete, valid API object with
 * sensible defaults. You pass only the fields you care about:
 *
 *   program({ name: "Farmers Market" })
 *
 * Why builders instead of writing objects by hand:
 * - The return type is the real API type (from src/typedefs.ts), so TypeScript
 *   tells you when the backend adds or renames a field.
 * - Each fixture only spells out what makes it different, which is easier to read.
 *
 * src/stories/fixtures.ts has similar builders for Storybook. They are not reused
 * here, because that file imports app modules that need a browser (`window`), and
 * these builders must also run in plain unit tests. Keep the two in step.
 */

let nextId = 1;

/** 36260 -> { cents: 36260, currency: "USD" }. Money in the API is always in cents. */
export function money(cents: number, currency: string = "USD"): Money {
  return { cents, currency };
}

/** Builds a `CurrentMember`: the logged-in member, as `useUser()` returns it. */
export function currentMember(o: Partial<CurrentMember> = {}): CurrentMember {
  return {
    id: nextId++,
    createdAt: "2026-01-15T12:00:00Z",
    email: "member@mysuma.org",
    name: "Ricky S",
    phone: "(555) 123-4567",
    onboarded: true,
    roleAccess: {},
    unclaimedOrdersCount: 0,
    ongoingTrip: null,
    readOnlyMode: false,
    readOnlyReason: "",
    paymentInstruments: [],
    adminMember: null,
    showPrivateAccounts: true,
    preferences: { subscriptions: [] },
    hasOrderHistory: false,
    chargeableCashBalance: null,
    finishedSurveyTopics: [],
    registrationLink: null,
    ...o,
  };
}

/** Builds a `LedgersView`, the GET /api/v1/ledgers/overview response. */
export function ledgersOverview(o: Partial<LedgersView> = {}): LedgersView {
  return {
    totalBalance: money(0),
    lifetimeSavings: money(0),
    ledgers: [],
    recentLines: [],
    ...o,
  };
}

/** Builds a `Program` (Suma::API::Me::ProgramEntity). */
export function program(o: Partial<Program> = {}): Program {
  return {
    name: "Holiday Special",
    description: "A holiday dinner for 4–6 for $10. Normally $180.",
    image: null,
    periodBegin: "2026-11-01T12:00:00Z",
    periodEnd: "2026-12-31T12:00:00Z",
    appLink: "/food",
    appLinkText: "Explore deals",
    ...o,
  };
}

/** Builds a `Dashboard` (Suma::API::Me::DashboardEntity), the GET /api/v1/me/dashboard response. */
export function dashboard(o: Partial<Dashboard> = {}): Dashboard {
  return {
    cashBalance: money(0),
    programs: [],
    alerts: [],
    ...o,
  };
}
