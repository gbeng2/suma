import useLocalStorageState from "../../state/useLocalStorageState.ts";
import useMountEffect from "../../state/useMountEffect.ts";
import OptionListRow, { OptionList } from "./OptionListRow.tsx";
import Stack from "./Stack.tsx";

export type Theme = "system" | "light" | "dark";
export type Contrast = "default" | "high";

/** The theme and contrast settings, as two Figma "Option list"s of OptionListRows. */
export default function ThemeSwitcher() {
  const [theme, setThemeState] = useLocalStorageState<Theme>("theme", "system");
  const [contrast, setContrastState] = useLocalStorageState<Contrast>(
    "contrast",
    "default"
  );

  useMountEffect(() => {
    setThemeOnDOM(theme, contrast);
  });

  function handleTheme(t: Theme) {
    setThemeState(t);
    setThemeOnDOM(t, contrast);
  }

  function handleContrast(c: Contrast) {
    setContrastState(c);
    setThemeOnDOM(theme, c);
  }

  return (
    <Stack col gap={7}>
      <OptionList legend="Appearance">
        {themes.map(({ value, title, hint }) => (
          <OptionListRow
            key={value}
            name="theme"
            value={value}
            title={title}
            hint={hint}
            selected={theme === value}
            // Like the Figma example: the list has no lines between the rows.
            divider={false}
            onSelect={() => handleTheme(value)}
          />
        ))}
      </OptionList>
      <OptionList legend="Contrast">
        {contrasts.map(({ value, title, hint }) => (
          <OptionListRow
            key={value}
            name="contrast"
            value={value}
            title={title}
            hint={hint}
            selected={contrast === value}
            divider={false}
            onSelect={() => handleContrast(value)}
          />
        ))}
      </OptionList>
    </Stack>
  );
}

const themes: { value: Theme; title: string; hint: string }[] = [
  { value: "light", title: "Light", hint: "Always use the light theme" },
  { value: "dark", title: "Dark", hint: "Always use the dark theme" },
  { value: "system", title: "System", hint: "Use whatever your system is set to." },
];

const contrasts: { value: Contrast; title: string; hint: string }[] = [
  { value: "default", title: "Default", hint: "Standard text and border strength" },
  {
    value: "high",
    title: "High Contrast",
    hint: "Stronger borders, dividers, larger text",
  },
];

function setThemeOnDOM(t: Theme, c: Contrast) {
  if (t === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    t = prefersDark ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", t);
  document.documentElement.setAttribute("data-contrast", c);
}
