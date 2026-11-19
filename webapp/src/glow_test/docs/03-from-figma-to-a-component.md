# 3. From Figma to a component

The steps used to build every component here. Follow the same ones to add or
change a component.

## 1. Find the node

Every layer in Figma has a node id like `2320:114`. Select the layer, then copy the
link: the id is in the URL as `node-id=2320-114` (the dash is a colon).

Node ids are written in the code so you can find the design again:

- In the gallery: `<Specimen title="Button" node="2320:114">`
- In component comments: `Figma "ProgramRow" (2022:55)`

In Figma, a *component set* is the frame that holds all variants of a component
(for Button: 4 types x 3 sizes). Work from the component set, so you see every
variant at once.

## 2. Check `src/ui` first

Before writing anything, look for an existing component that does the same job.
Most Figma components already had one. The work is then restyling, not inventing.
Only create a new file when nothing fits (for example `CardRow`, `Radio`).

## 3. Read the design as numbers

From Figma's inspect panel (or the Figma MCP tool `get_design_context`), write down:

- size: width, height, padding, gap
- shape: corner radius, border width
- color: fill, border, text, each as a **variable name**, not a hex value
- type: font, size, weight, line height
- variants and states: what changes between them

Figma's generated code uses Tailwind classes and absolute positioning. Treat it as a
measurement sheet. Do not paste it in.

## 4. Turn variants into props

A Figma variant property becomes a prop:

| Figma | Prop |
|---|---|
| `type=strong / soft / outline / ghost` | `variant` |
| `size=S / M / L` | `size="sm" / "md" / "lg"` |
| `checked=On / Off` | `checked` |
| the "tint" color family | `color="primary" / "danger" / ...` |

States such as Hover and Focus are **not** props. They are CSS:

```css
.btn:hover { ... }
.btn:focus-visible { ... }
.btn:disabled { ... }
```

The gallery still needs to show a hover state without a mouse. So each state also
has a helper class (`.is-hover`, `.is-focus-visible`) that forces it. Use those only
in the gallery.

## 5. Write the CSS with tokens

- Wrap the file in `.glow { ... }`.
- Use a token for every value that has one. Check the table at the top of `tokens.css`.
- For a value with no token, add a local variable with a comment (see guide 1).
- Use flexbox with `gap` for layout. Avoid fixed widths: Figma frames have them only
  because a drawing needs some width.

One Figma habit to know: Figma draws borders *inside* the box, CSS adds them
*outside* the padding. A box with 18px padding and a 1px border is 2px bigger in CSS
than in Figma unless you subtract the border from the padding. `components/forms.css`
does this for input fields.

## 6. Add it to the gallery

Add a `<Specimen>` to the right file in `gallery/`, showing every variant and state.
Wrap it in a div with the Figma frame's width so sizes can be compared:

```tsx
<Specimen title="CheckboxRow" node="2421:573">
  <div style={{ width: 343 }}>
    <CheckboxRow label="WIC" meta="Women, Infants and Children" />
  </div>
</Specimen>
```

## 7. Compare with Figma

Put the gallery and the Figma frame side by side at the same zoom. Check, in this
order, because earlier mistakes cause later ones:

1. Overall size (width and height in the browser dev tools against Figma).
2. Padding and gaps.
3. Font size, weight, line height.
4. Colors and borders.
5. Each state.

Off by 1 or 2 pixels is usually line height or the border issue above.

## 8. Check the code

```bash
npx tsc --noEmit 2>&1 | grep glow_test      # no output means no type errors here
npx eslint --ext .ts,.tsx src/glow_test
npx prettier --write "src/glow_test/**/*.{ts,tsx}"
```

The plain `npx tsc --noEmit` prints errors from the rest of the app too. Those are
known (see guide 4). The `grep` keeps only the prototype's.

## Icons

Icons are in `icons/`, one component per Figma icon. They draw with `currentColor`,
so they take the text color of whatever they are inside:

```tsx
<Check size={18} />
```

The path data was generated from the Figma SVG files. Do not edit paths by hand. To
add an icon, export its SVG from Figma and follow the pattern in an existing file
such as `icons/Check.tsx`: a 24x24 `IconBase`, with the shape placed inside at the
position it has in the Figma frame.

Next: [Moving it into the real app](04-moving-it-into-the-real-app.md)
