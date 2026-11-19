# 6. Exercises

Reading code teaches less than writing it. Each exercise asks you to rebuild a
piece that already exists, then compare yours with the one here. Differences are
the interesting part: bring them to a review and we can go through why.

They go from small to large. Do the guides first.

For each one: make a branch, delete or rename the file, rebuild it, and check your
work in the gallery or with the tests. `git diff` against the original when done.

## A. CSS and tokens

**A1. Chip.** Delete the rules inside `components/Chip.css` (keep the `.glow`
wrapper). Rebuild from Figma node `2414:154`. Check in the gallery under Data
Display.
*Practices:* reading sizes from Figma, picking tokens.

**A2. Add a size.** Give `Button` an `xs` size, 28px high. Decide the padding
yourself and say why.
*Practices:* how size variants are wired from prop to class to CSS variable.

**A3. A missing state.** Nav tabs have no pressed state. Add one.
*Practices:* `:active`, and choosing between the `-hover` and `-pressed` tokens.

## B. Components

**B1. CardRow.** Delete `components/CardRow.tsx` and `.css`. Rebuild from node
`2391:28`. It has two variants: selected and not.
*Practices:* a small component end to end: props, class names, CSS, gallery entry.

**B2. ProgramRow.** Rebuild `dashboard/ProgramRow.tsx` from node `2022:55`. It has a
Row and a Tile layout.
*Practices:* one component, two layouts, without duplicating markup.
*Question to answer:* why does the text block use `min-width: 0`?
Remove it and use a very long program name to find out.

**B3. Radio.** Rebuild `components/Radio.tsx` from node `2420:593`. It must be a real
`<input type="radio">`, not a styled div.
*Practices:* `appearance: none`, drawing the checked state in CSS, keeping keyboard
and screen reader behavior for free.

## C. Data

**C1. A new alert.** The member's payment card is about to expire. The server sends
an alert with key `dashboard.payment_methods_expiring` and variant `warning`.
Make it show a title, a second line, and link to `/funding`.
Write the test first.
*Practices:* the mapping layer, test-first.

**C2. Rewrite `toDashboardProps`.** Rename the file, then write it again using only
the tests and the `DashboardViewProps` type as your guide. All 7 tests must pass.
*Practices:* pure functions, reading types as a specification.

**C3. A new fixture state.** Add `many_alerts`: a member with an ongoing trip, an
unverified account, 3 orders to claim, and a negative balance.
*Question to answer:* in what order do they appear, and is that the right order?
Who should decide?

**C4. Loading and error.** `DashboardView` assumes data is always there. Add a
loading state and an error state. Decide where that logic belongs: view, container,
or mapping? Write down your reason before you start.
*Practices:* the question every real page has to answer.

## D. A whole page

**D1. Program page.** Build a second prototype page for one program, using
`ProgramHeader` and the three-layer setup from guide 2. Start from the API:
which endpoint returns a program's offerings? What does the design need that it
does not return?
*Practices:* everything, in order. This is the real job.

## How to check your own work

- Does it match Figma at the same zoom, side by side?
- Are there any hex colors or pixel values that should be tokens?
- Could someone use it with only the keyboard?
- What happens with text three times as long?
- Do `tsc`, `eslint` and the tests pass?
