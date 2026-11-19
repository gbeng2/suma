import history from "../history";
import Components from "./pages/Components.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { unstable_HistoryRouter as Router, useRoutes } from "react-router-dom";

/**
 * Standalone app for the glow prototype pages.
 * It is rendered by index.tsx INSTEAD of the real app, outside all the providers
 * (user, i18n, backend globals), so prototype pages work with no backend running.
 * Pages here must use fixture data (see fixtures/), not API calls.
 */
export default function GlowApp() {
  return (
    <Router basename={import.meta.env.BASE_URL} history={history as any}>
      <GlowRoutes />
    </Router>
  );
}

function GlowRoutes() {
  return useRoutes([
    { path: "/glow_test/components", element: <Components /> },
    { path: "/glow_test/dashboard", element: <Dashboard /> },
    { path: "/glow_test/*", element: <Components /> },
  ]);
}
