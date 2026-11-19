# 5. Open questions

Things found while building that someone must decide. Each has what was done in
the prototype for now. Remove an entry when it is settled.

## For the designer

**BottomNav and Nav/NavOption disagree.** Two Figma components draw the same tab bar
differently.

| | BottomNav (1922:12349) | Nav + NavOption (2436:741) |
|---|---|---|
| Top corners | 12px radius | square |
| Gap between icon and label | 6px | 4px |
| Border of inactive tab | strong blue | lighter blue |
| Labels | Home, Commerce, Map, More | Home, Offers, Map, More |

*For now:* follows BottomNav, because the Dashboard design uses it.

**OnboardingVerificationStatusCard (1737:6293) is marked as unfinished in Figma**, and
it is not in any of the four Dashboard states. Where does it go?
*For now:* built, and shown alone at `?state=verifying`.

**Savings bar.** In Figma the green part has a fixed width, about 62% of the bar.
The amounts shown ($362.60 saved, $88.40 paid) work out to 80%.
*For now:* width is calculated from the amounts.

**Success green.** The savings amount uses `#647300`, an olive green. The theme's
green scale has no such color. Is the whole green scale changing?
*For now:* only `--text-success-placeholder` was set to it.

**States Figma does not show:**

- A program with no image. *For now:* a plain soft-colored square.
- A program with no link. *For now:* no button.
- Hover and pressed for BackButton look the same as default.
- Hover for nav tabs. *For now:* a pale fill.
- Focus for OptionListRow.
- Dialog on a wide screen. *For now:* a bottom sheet, centered, max 600px wide.
- Loader (2418:16711) is a placeholder that says "Todo".
- Switch error state has a designer note asking whether it should exist.
- AlertStack footer ("See all 4 alerts") has a note saying to remove it.

**ButtonGroup "Vertical"** looks the same as Horizontal in Figma.
*For now:* a real column.

**Table rows inside a Card** have no side padding in Figma, so text touches the card
edge. *For now:* built as drawn.

**Two icons are the same picture.** `Icon/Photo/Lemon` and `Icon/Photo/Biketown` both
hold the bike photo.

**Values with no token.** Figma uses some sizes that are not on the spacing or radius
scales: 12px and 16px gaps, 16px radius on program images, 13px, 1.5px borders. Each
is a local variable in its component's CSS. Should some become tokens?

## For the backend

These are the fields in `DashboardNotInApiYet` (`fixtures/dashboard.ts`), plus gaps
found in the mapping layer.

**"You paid" total.** The savings card compares money saved with money paid.
`LedgersView.lifetimeSavings` gives the first. Nothing gives the second.
*Options:* add a field, or drop the bar from the design.

**Savings is on a different endpoint.** `lifetimeSavings` comes from
`/api/v1/ledgers/overview`, not `/api/v1/me/dashboard`. The Dashboard would make two
requests. Should it be added to the dashboard response?

**Alerts need two lines of text.** The design has a bold title and a muted second
line. Each alert has one translated string today.
*Needed:* a second string per alert key, in English and Spanish.

**Order alert detail.** The design shows "Holiday Demo · 1 item". The API gives only
`unclaimedOrdersCount`.

**Server alerts have no link.** The design draws every alert as a link. The API sends
no destination. *For now:* `toDashboardProps.ts` picks a link by alert key
(`serverAlertLinks`), which only covers the negative balance alert.

**Programs have no id.** `Program` has no `id` field, and two programs can share a
name. *For now:* the list position is used to tell them apart.

## For us

- No dark theme or high contrast values in `tokens.css`. The contrast picker in the
  gallery changes nothing.
- No Spanish. Longer strings have not been tried in any layout.
- These components were type-checked but never shown on a page: `ThemeSwitcher`,
  the form-connected `PhoneInput`, `CheckboxCard`, `FormSubmit`.
- The repo's `npm test` only runs Storybook tests. Plain unit tests such as
  `src/modules/payment.test.ts` are not picked up by it. The prototype's tests need
  `--config vitest.glow.config.mjs` for the same reason.

Next: [Exercises](06-exercises.md)
