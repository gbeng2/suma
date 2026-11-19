# 4. Moving it into the real app

The prototype is not production code. This is what is left, in the order that
makes each step easier than the one after it.

## Where things stand

Works today:

- All shared components, compared against Figma in the gallery.
- The Dashboard page in four states, on fixtures.
- Type checks, lint and unit tests pass for `src/glow_test`.

Does not work today:

- **The real app does not build on this branch.** `npm run build` fails, so nothing
  can be deployed, including the prototype. The prototype only runs on the dev server.
- No real data, no login, no translations.
- One page only. Links and nav tabs go nowhere.
- Not checked: keyboard use, screen readers, wide screens, long text, Spanish.

## Step 1: make the app build again

The branch is in the middle of a restyle of `src/ui`. Some files were renamed or had
their props changed, and the pages that use them were not all updated. There are
38 type errors in 23 files, with four causes.

**Missing `src/ui/PageHeader.tsx`** (stops the build):
`pages/Trips.tsx`, `pages/TripDetailPage.tsx`, `pages/ThemePage.tsx`,
`pages/OrderHistoryList.tsx`, `pages/MenuPage.tsx`, `pages/FundingPage.tsx`,
`pages/FundingAddCardPage.tsx`, `components/Preferences.tsx`

**Missing `src/ui/BreadcrumbBack.tsx`** (stops the build):
`pages/FundingPage.tsx`, `pages/FundingAddCardPage.tsx`, `pages/OrderHistoryDetail.tsx`,
`pages/onboarding/OnboardingAddress.tsx`, `OnboardingEligibility.tsx`,
`OnboardingName.tsx`, `OnboardingTheme.tsx`

**Old Button props** (`preset`, and the `"filled"` variant, no longer exist):
`ui/BackButton.tsx`, `ui/ContinueButton.tsx`, `components/AddToHomescreen.tsx`,
`components/CartIconButton.tsx`, `components/FoodCartWidget.tsx`,
`components/Funding.tsx`, `components/OrderList.tsx`, `pages/PartnerSignup.tsx`,
`pages/onboarding/Home.tsx`

**Old Alert, FormSubmit and theme props:**
`components/Dashboard.tsx`, `components/AddCreditCard.tsx`, `components/Funding.tsx`,
`components/OrderList.tsx`, `components/Preferences.tsx`, `pages/MenuPage.tsx`

To see the current list:

```bash
npx tsc --noEmit
```

The first two groups stop the build because `App.tsx` imports every page, so one
missing file breaks all of them. The other two are type errors: the app still
bundles, but the old props are ignored, so those buttons and alerts look wrong.

A shortcut if you only need to share the prototype: give `glow_test` its own Vite
entry point, so it builds without `App.tsx`. That does not fix the app.

## Step 2: settle the design questions

See [Open questions](05-open-questions.md). Porting a component that is about to
change is wasted work.

## Step 3: move components into `src/ui`, one at a time

For each component:

1. Compare the two versions: `diff src/ui/X.tsx src/glow_test/components/X.tsx`.
2. Copy the glow `.tsx` and `.css` over the `src/ui` ones.
3. Remove the `.glow {` line at the top of the CSS and its closing `}` at the bottom.
4. Fix the import paths: `../../routing/` becomes `../routing/`.
5. Put translations back. Prototype components have English defaults such as
   `"Back"` and `"Continue"`. In `src/ui` those should be `t("common.back")`.
6. Find every use of the component and update changed props (list below).
7. Run `npx tsc --noEmit`. It will point at every caller that needs updating.
8. Check the pages that use it in the browser, and its Storybook story.

Do `Button` first. Almost everything else depends on it.

Move the tokens at the start: copy the values that changed from `tokens.css` into
`src/assets/styles/01_theme.css`. Both files use the same names, so a diff shows
exactly what to copy. Also fix the font there (next section).

### Props that changed

| Component | In `src/ui` | In `glow_test` |
|---|---|---|
| Button | `variant="primary" / "secondary" / "text"` | `"strong" / "soft" / "ghost"` |
| Button | (none) | `leadingIcon`, `trailingIcon` |
| Chip | `variant`, `invert` | `color`, `weight="soft" / "strong"` |
| ChecklistItem | `variant="checked"` | `state="done"` |
| IconChip | `color` (any theme color), numeric size | `color="primary" / "accent"`, `size="md" / "lg"` |
| CardImage | `variant="flush"` | `variant="default" / "inset"` |
| Nav | reads app state | `active`, `items`, `onSelect` props |
| Page | `appNav` | `nav={<Nav active="home" />}` |
| Dialog | centered, with a close button | bottom sheet, no close button |
| Pagination | `variant`, `size` | removed |
| TextInput | `required` shows `*` | `optional` shows "Optional" |

New components with no `src/ui` version: `AlertStack`, `CardRow`, `KeyValueList`,
`Spinner`, `ProgressCircle`, `ProgressBar`, `Radio`, `CheckboxRow`, `OptionRow`,
`OptionListRow`, `OptionBody`, `PageHeader`, `SectionHeader`, `ProgramHeader`,
`OfferingHeader`.

## Step 4: fix the font

Semibold text (weight 600) does not render in the real app. In `01_theme.css` the
`@font-face` for `SourceSansPro` says it covers weights 100 to 900 but points at one
file, `SourceSansPro-Regular.ttf`. The browser has only the regular shape, so it
uses that for everything.

The prototype works around it in `glow.css` by declaring one `@font-face` per
weight file. Copy that approach into `01_theme.css`.

## Step 5: rebuild pages on the new components

For each page: build it in the prototype on fixtures first (guide 2), get design
sign-off, then replace the container with real data fetching.

For the Dashboard, the real container is `src/pages/DashboardPage.tsx`. It already
fetches `api.dashboard` and reads `useUser()`. What it needs:

- a second fetch, `api.getLedgersOverview`, for savings
- a call to `toDashboardProps`
- `<DashboardView>` in place of the old `<Dashboard>`
- loading and error states (see `AsyncContent`)
- translated strings in place of `dashboard/alertStrings.ts`

## Step 6: delete the prototype

When a component or page has moved, delete its glow copy in the same change. Two
copies drift apart fast. When the last one is gone, remove `src/glow_test`, the
branch in `src/index.tsx`, the two `/glow_test/...` entries in
`src/routing/routes.ts`, and `vitest.glow.config.mjs`.

Next: [Open questions](05-open-questions.md)
