# 2. Fixtures and real data

A *fixture* is fake data kept in the code, used in place of a backend. The Dashboard
prototype runs on fixtures. This guide explains how they are set up so that switching
to real data later is a small change, and why that takes some care.

## The problem

The quick way to build a prototype page is to write data in whatever shape the page
wants:

```ts
const alerts = [{ title: "Your balance is -$50.", text: "Please pay to regain access." }];
```

It works, and it hides a problem. The real backend does not send that. It sends:

```ts
{ localizationKey: "dashboard.negative_cash_balance_v2",
  localizationParams: { amount: { cents: -5000, currency: "USD" } },
  variant: "danger" }
```

If the page is built on the first shape, then "use real data" at the end means
rewriting the page. Worse, you only find out at the end that the design shows
something the backend cannot provide.

## The answer: three layers

```
 fixture or API          mapping function            view
 (backend's shape)  -->  toDashboardProps()  -->  <DashboardView>
                         (knows both shapes)     (screen's shape)
```

| Layer | File | Job |
|---|---|---|
| Data | `fixtures/dashboard.ts` | Fake data in the **backend's** shape. |
| Mapping | `dashboard/toDashboardProps.ts` | Turns backend data into what the screen needs. |
| View | `dashboard/DashboardView.tsx` | Draws props. Knows nothing about the backend. |
| Container | `pages/Dashboard.tsx` | Gets the data, calls the mapping, renders the view. |

Each layer has one job, and only the mapping layer knows both shapes.

### Layer 1: fixtures in the backend's shape

The backend's response types are in `src/typedefs.ts`. That file is generated from
the backend code, so it is always right. Its types are global: you can write
`Dashboard` or `CurrentMember` anywhere without importing them.

The fixture is typed with those:

```ts
export interface DashboardApiData {
  user: CurrentMember;   // from useUser()
  dashboard: Dashboard;  // from api.dashboard
  ledgers: LedgersView;  // from api.getLedgersOverview
}
```

Now TypeScript refuses a field the backend does not have. Try it: add
`paidCents: 100` inside a `dashboard({...})` call and watch the error.

Fixtures are written with *builders* (`fixtures/builders.ts`). A builder returns a
complete valid object, and you pass only what differs:

```ts
currentMember({ unclaimedOrdersCount: 1 })
```

Without builders every fixture would repeat 19 fields of `CurrentMember`, and the one
field that matters would be hard to spot.

### What the backend does not have

Some things in the Figma design have no source in the API. They are not hidden
inside the fixture. They sit in their own object with an honest name:

```ts
export interface DashboardNotInApiYet {
  paidCents: number | null;
  unclaimedOrderSummary: string | null;
}
```

This is the most useful part of the setup. The list of gaps between design and
backend is now in the code, typed, and impossible to forget. When the backend adds
a field, you delete it from this interface and the compiler shows you every place
to update.

### Layer 2: the mapping function

`toDashboardProps(api, notInApiYet)` returns the props for the view. It is a *pure
function*: same input gives same output, and it does nothing else. No React, no
fetching, no reading the URL.

That makes it the easiest code in the project to test. Read
`dashboard/toDashboardProps.test.ts`: each test builds some data, calls the
function, and checks the result. No browser needed.

Rules that used to be scattered through JSX live here as plain code, for example
"show an alert when `user.unclaimedOrdersCount > 0`". The alert rules are copied
from `TopAlerts` in `src/components/Dashboard.tsx`, which is the real app's version.

### Layer 3: the view

`DashboardView` takes props and draws them. It has no idea whether the props came
from a fixture or a server. This is called a *pure view* or *presentational
component*.

### The container

`pages/Dashboard.tsx` is the only file that knows about fixtures:

```tsx
const fixture = dashboardStates[stateKey];
const viewProps = toDashboardProps(fixture.api, fixture.notInApiYet);
return <DashboardView {...viewProps} />;
```

## Switching to real data later

Only the container changes. Roughly:

```tsx
const { user } = useUser();
const dashboard = useAsyncFetch<Dashboard>(api.dashboard, { default: {} as Dashboard });
const ledgers = useAsyncFetch<LedgersView>(api.getLedgersOverview, { default: {} as LedgersView });

const viewProps = toDashboardProps(
  { user: user!, dashboard: dashboard.state, ledgers: ledgers.state },
  { paidCents: null, unclaimedOrderSummary: null }
);
```

The fixtures, the mapping function, the view and the tests stay as they are. You
will also need loading and error states, which the prototype does not have. Look at
`AsyncContent` in `src/components/Dashboard.tsx` for how the real app does it.

## How to add a page state

1. Add an entry to `dashboardStates` in `fixtures/dashboard.ts`.
2. Open `/glow_test/dashboard?state=<your key>`.

If the state needs data the view cannot show yet, work outward from the middle:
add the field to `DashboardViewProps`, fill it in `toDashboardProps`, add a test,
then draw it in the view.

## How to do this for a new page

1. Find the endpoint in `src/api.ts` and its response type in `src/typedefs.ts`.
2. Add builders for any types that have none.
3. Write the fixture using only those types.
4. Go through the Figma screen and ask of every value: which field is this?
   Anything with no field goes in a `NotInApiYet` interface and in
   [Open questions](05-open-questions.md).
5. Write the mapping function and its tests.
6. Write the view, then the container.

Step 4 is the one people skip. It is also the one that saves the most time.

Next: [From Figma to a component](03-from-figma-to-a-component.md)
