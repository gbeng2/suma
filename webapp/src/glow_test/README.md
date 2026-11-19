# glow_test: the restyle prototype

This folder is a prototype of the new suma design, built from the Figma file
`ADTxLQ4oaJHKFEyoovLEWH`. It lives inside the webapp but runs on its own: it needs
no backend, no login, and it cannot change how the real app looks.

It exists to answer one question: **does the new design work as real, running UI?**
It is not production code yet. Section 04 of the docs explains what is left.

## Run it

```bash
cd webapp
npm install --legacy-peer-deps
npm start
```

Then open:

- `http://localhost:22004/glow_test/components`: every shared component, grouped like the Figma file.
- `http://localhost:22004/glow_test/dashboard`: the Dashboard page.
  Add `?state=default`, `no_alerts`, `no_savings` or `no_programs` to see each Figma state.

Run the unit tests:

```bash
npx vitest run --config vitest.glow.config.mjs
```

## What is in here

| Path | What it is |
|---|---|
| `GlowApp.tsx` | The small app that serves `/glow_test/*`. Loaded by `src/index.tsx`. |
| `GlowRoot.tsx` | Wrapper that turns the prototype styles on. Every page uses it. |
| `tokens.css` | Design tokens (colors, spacing, radius, type) with Figma values. |
| `glow.css` | Base styles and fonts for the prototype. |
| `components/` | Shared components. A copy of `src/ui/`, rebuilt to match Figma. |
| `icons/` | The Figma icons as React components. |
| `dashboard/` | Pieces that only the Dashboard uses, plus its mapping layer. |
| `fixtures/` | Fake data, shaped like real API responses. |
| `pages/` | One file per page: `Components.tsx`, `Dashboard.tsx`. |
| `gallery/` | The sections shown on the components page. |
| `assets/` | Images downloaded from Figma. |
| `docs/` | The guides below. |

## Guides

Read them in order the first time. Each one is short.

1. [How the prototype is built](docs/01-how-the-prototype-is-built.md): the ideas that hold it together.
2. [Fixtures and real data](docs/02-fixtures-and-real-data.md): how a page gets its data, now and later.
3. [From Figma to a component](docs/03-from-figma-to-a-component.md): the steps to build or change one.
4. [Moving it into the real app](docs/04-moving-it-into-the-real-app.md): what is left, in order.
5. [Open questions](docs/05-open-questions.md): things design or backend must decide.
6. [Exercises](docs/06-exercises.md): things to rebuild yourself to learn the code.
