import GlowRoot from "../GlowRoot.tsx";
import Alert from "../components/Alert.tsx";
import AlertStack from "../components/AlertStack.tsx";
import Nav from "../components/Nav.tsx";
import Page from "../components/Page.tsx";
import OnboardingVerificationStatusCard from "../dashboard/OnboardingVerificationStatusCard.tsx";
import ProgramList from "../dashboard/ProgramList.tsx";
import SavingSummary from "../dashboard/SavingSummary.tsx";
import {
  DashboardAlert,
  DashboardStateKey,
  dashboardStates,
  verificationFixture,
} from "../fixtures/dashboard.ts";
import { Info, Prohibit } from "../icons";
import "./Dashboard.css";
import { useSearchParams } from "react-router-dom";

const alertIcons = { info: Info, prohibit: Prohibit };

/**
 * Figma "Dashboard - New" (2022:81). Mounted at /glow_test/dashboard.
 *
 * Uses fixture data. Pick a Figma page state with the `state` query param:
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
  const { alerts, savings, programs } = dashboardStates[stateKey];

  return (
    <GlowRoot>
      <Page buffer={false} gap={6} className="dashboard-main" nav={<Nav active="home" />}>
        {/* Figma annotation: the page title is for screen readers only. */}
        <h1 className="dashboard-sr-only">Home</h1>
        {verifying ? (
          <OnboardingVerificationStatusCard {...verificationFixture} />
        ) : (
          <>
            {alerts.length > 0 && (
              <AlertStack>
                {alerts.map((a) => (
                  <DashboardAlertItem key={a.id} alert={a} />
                ))}
              </AlertStack>
            )}
            <SavingSummary
              savedCents={savings?.savedCents}
              paidCents={savings?.paidCents}
            />
            <ProgramList programs={programs} />
          </>
        )}
      </Page>
    </GlowRoot>
  );
}

function DashboardAlertItem({ alert }: { alert: DashboardAlert }) {
  return (
    <Alert
      color={alert.color}
      icon={alertIcons[alert.icon]}
      title={alert.title}
      text={alert.text}
      // Fixture links point at real app routes, which the prototype does not have.
      to="/glow_test/dashboard"
    />
  );
}
