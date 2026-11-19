# 1. How the prototype is built

Four ideas explain almost every file in `glow_test`. Learn these and the rest reads easily.

## Idea 1: a copy, not a change

`components/` started as an exact copy of `src/ui/`. Each file was then rebuilt to
match Figma. The original `src/ui/` was never touched.

Why copy instead of editing `src/ui/` directly? The real app uses `src/ui/` on every
page. Changing a button there changes it everywhere at once, before the design is
agreed. A copy lets the design move freely.

A useful result: you can compare any component with its original.

```bash
diff src/ui/Button.css src/glow_test/components/Button.css
```

That diff is exactly "what the redesign changed".

## Idea 2: everything is scoped under `.glow`

The copies keep the same CSS class names as the originals (`.btn`, `.card`, ...).
Two files both styling `.btn` would fight. To stop that, every CSS file in the
prototype is wrapped like this:

```css
.glow {
  .btn {
    height: var(--btn-h);
  }
}
```

This is CSS nesting. The browser reads it as `.glow .btn { ... }`: "a `.btn` that is
inside an element with class `glow`". So the rule does nothing outside the prototype.

`GlowRoot.tsx` renders `<div class="glow">`. Every prototype page wraps its content
in `<GlowRoot>`. That is the switch that turns the prototype styles on.

Two rules follow from this:

- **Every new CSS file needs the `.glow { ... }` wrapper.**
- `@keyframes` and `@font-face` go **outside** the wrapper. They are not allowed
  inside a style rule. See `components/Spinner.css` for an example.

## Idea 3: tokens, not raw values

A token is a named value. Instead of writing `#36569C` in ten files, the color is
defined once in `tokens.css` and used by name:

```css
background-color: var(--fill-primary-strong);
```

If design changes the brand blue, one line changes. Tokens also carry meaning:
`--fill-primary-strong` says what the color is *for*, which `#36569C` does not.

`tokens.css` is a copy of the app's `src/assets/styles/01_theme.css`, with values
updated from Figma. The token **names** were kept the same as the app's on purpose,
so a component can move back into `src/ui/` without renaming anything.

Figma uses slightly different names. The comment at the top of `tokens.css` is the
translation table. The common ones:

| Figma | Here |
|---|---|
| `--glow-space-4` | `--space-4` |
| `--glow-radius-3` | `--border-radius-3` |
| `brand` | `primary` |
| `--text-secondary-ink` | `--text-secondary` |

Sometimes Figma uses a value with no token, like a 12px gap. Then the component
defines a local variable at the top of its own CSS, with a comment:

```css
.program-row {
  /* Figma uses 12px here, which is not on the spacing scale. */
  --program-row-gap: 12px;
}
```

That keeps odd values visible and easy to find later. A long list of them in one
component is a hint to ask the designer whether a token is missing.

## Idea 4: the prototype is its own small app

The real app (`App.tsx`) wraps every page in providers: the logged-in user,
translations, backend settings. All of them call the backend when the page loads.
A prototype page inside that tree would show a loading spinner forever with no
backend running.

So `src/index.tsx` checks the URL first:

```tsx
if (isGlowPath()) {
  import("./glow_test/GlowApp.tsx").then(/* render it */);
} else {
  /* load the real app */
}
```

`import("...")` with parentheses is a *dynamic import*: the file is only loaded when
that line runs. So on a `/glow_test/...` URL, `App.tsx` is never loaded at all.
`GlowApp.tsx` is a tiny router with just the prototype pages.

Two things to remember because of this:

- Prototype pages cannot use `useUser()`, `t()`, or `api.*`. Those need the providers.
  Text is written directly in English, and data comes from fixtures (see guide 2).
- A new prototype page needs a route in `GlowApp.tsx`.

## How a component file is laid out

Open `components/Button.tsx` and `Button.css` side by side. Most components follow
the same shape:

1. **Props interface** with a comment on each prop that is not obvious.
2. **The component**: builds a class name with `clsx`, returns the markup.
3. **Variants as class names**: `btn-strong`, `btn-sm`. The CSS has one block per variant.
4. **Colors as CSS variables set from JS**, when a color depends on two props at once
   (variant *and* color). See `toButtonStyle` in `Button.tsx`.

The comments in the CSS name the Figma term each block comes from, so you can find
the matching layer in Figma.

Next: [Fixtures and real data](02-fixtures-and-real-data.md)
