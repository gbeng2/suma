import GlowRoot from "../GlowRoot.tsx";
import Nav from "../components/Nav.tsx";
import Page from "../components/Page.tsx";
import DashboardView from "../dashboard/DashboardView.tsx";
import OnboardingVerificationStatusCard from "../dashboard/OnboardingVerificationStatusCard.tsx";
import toDashboardProps from "../dashboard/toDashboardProps.ts";
import {
  DashboardStateKey,
  dashboardStates,
  verificationFixture,
} from "../fixtures/dashboard.ts";
import "./Dashboard.css";
import { useSearchParams } from "react-router-dom";

/**
 * The Dashboard prototype page. Mounted at /glow_test/dashboard.
 *
 * This file is the "container": it gets the data and hands it to the view.
 *
 *   fixture (API-shaped)  ->  toDashboardProps()  ->  <DashboardView>
 *
 * To use real data later, only this file changes: replace the fixture lookup
 * with `useUser()`, `useAsyncFetch(api.dashboard)` and
 * `useAsyncFetch(api.getLedgersOverview)`. See docs/02-fixtures-and-real-data.md.
 *
 * Pick a Figma page state with the `state` query param:
 *   ?state=default      (2513:4304)
 *   ?state=no_alerts    (2513:4309)
 *   ?state=no_savings   (2513:4314)
 *   ?state=no_programs  (2750:29004)
 * Extra, not one of the Figma page states:
 *   ?state=verifying    shows the OnboardingVerificationStatusCard (1737:6293)
 */
export default function Dashboard() {
  const [params] = useSearchParams();
  const stateParam = params.get("state") || "default";
  const verifying = stateParam === "verifying";
  const stateKey: DashboardStateKey =
    stateParam in dashboardStates ? (stateParam as DashboardStateKey) : "default";
  const fixture = dashboardStates[stateKey];
  const viewProps = toDashboardProps(fixture.api, fixture.notInApiYet);

  return (
    <GlowRoot>
      <Page buffer={false} gap={6} className="dashboard-main" nav={<Nav active="home" />}>
        {/* Figma annotation: the page title is for screen readers only. */}
        <h1 className="dashboard-sr-only">Home</h1>
        {verifying ? (
          <OnboardingVerificationStatusCard {...verificationFixture} />
        ) : (
          <DashboardView {...viewProps} resolveLink={stayOnPrototype} />
        )}
      </Page>
    </GlowRoot>
  );
}

/** The real routes (like /food) do not exist in the prototype, so links stay here. */
function stayOnPrototype() {
  return "/glow_test/dashboard" as const;
}
