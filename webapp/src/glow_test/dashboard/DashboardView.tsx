import { RoutePathOrUrl, untypedRoutePath } from "../../routing/RoutePath.ts";
import Alert from "../components/Alert.tsx";
import AlertStack from "../components/AlertStack.tsx";
import { Info, Prohibit } from "../icons";
import ProgramList from "./ProgramList.tsx";
import SavingSummary from "./SavingSummary.tsx";
import { DashboardViewProps } from "./toDashboardProps.ts";

const alertIcons = { info: Info, prohibit: Prohibit };

interface Props extends DashboardViewProps {
  /**
   * Changes where links go. Defaults to using the link as it is.
   * The prototype passes a function that keeps every link on the prototype page.
   */
  resolveLink?: (to: string) => RoutePathOrUrl;
}

/**
 * The content of the Dashboard (Figma "Dashboard - New", 2022:81), without the page shell.
 *
 * This is a "pure view": everything it shows comes from props.
 * It does not fetch, read the URL, or know what a fixture is.
 * That is why the same component works with fixtures now and real data later.
 * Props are built by `toDashboardProps` (toDashboardProps.ts).
 */
export default function DashboardView({
  alerts,
  savedCents,
  paidCents,
  programs,
  resolveLink = untypedRoutePath,
}: Props) {
  return (
    <>
      {alerts.length > 0 && (
        <AlertStack>
          {alerts.map((a) => (
            <Alert
              key={a.id}
              color={a.color}
              icon={alertIcons[a.icon]}
              title={a.title}
              text={a.text}
              to={a.to && resolveLink(a.to as string)}
            />
          ))}
        </AlertStack>
      )}
      <SavingSummary savedCents={savedCents} paidCents={paidCents} />
      <ProgramList programs={programs} resolveLink={resolveLink} />
    </>
  );
}
