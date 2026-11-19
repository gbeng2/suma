import useId from "../../state/useId.ts";
import "./LanguageSwitcher.css";
import Select from "./Select.tsx";
import clsx from "clsx";
import React from "react";

/** @deprecated The Figma LanguageSwitcher has only one layout. */
export type LanguageSwitcherVariant = "horizontal" | "vertical" | "short";

interface LanguageSwitcherProps {
  /** Text at the start of the row. Pass a translated string in the real app. */
  label?: React.ReactNode;
  supportedLocales: Locale[];
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  /** @deprecated Not used. Kept so callers from src/ui still compile. */
  variant?: LanguageSwitcherVariant;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Figma "LanguageSwitcher": a "Language" label with a Select of the languages.
 *
 * This component is only visual. It gets the languages and the current language as
 * props, and has no i18n hooks. The connected wrapper is components/TranslationToggle.
 */
export default function LanguageSwitcher({
  label = "Language",
  supportedLocales,
  currentLanguage,
  changeLanguage,
  className,
  style,
}: LanguageSwitcherProps) {
  const selectId = useId();
  if (!supportedLocales) {
    return null;
  }
  return (
    <div className={clsx("language-switcher", className)} style={style}>
      <label className="language-switcher-label" htmlFor={selectId}>
        {label}
      </label>
      <Select
        id={selectId}
        fit
        name="language"
        options={supportedLocales.map(({ code, native }) => ({
          value: code,
          label: native,
        }))}
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.currentTarget.value)}
      />
    </div>
  );
}
