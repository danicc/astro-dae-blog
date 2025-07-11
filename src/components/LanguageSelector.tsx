import { useState } from "react";
import {
  getLangFromUrl,
  languages,
  normalizePath,
} from "@i18n/utils";
import { getRelativeLocaleUrl } from "astro:i18n";
import { navigate } from "astro:transitions/client";

export default function LanguageSelector() {
  const isClient = typeof window !== "undefined";
  const currentURL = isClient ? new URL(window.location.href) : null;
  const currentLanguage = currentURL ? getLangFromUrl(currentURL) : "en";
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof languages>(currentLanguage as keyof typeof languages);

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLang = e.target.value;
    if (currentURL && newLang !== selectedLanguage) {
      // Usar la función centralizada para limpiar el path
      const cleanPath = normalizePath(currentURL, selectedLanguage);
      const newPath = getRelativeLocaleUrl(newLang, cleanPath);
      navigate(newPath);
      setSelectedLanguage(newLang as keyof typeof languages); // Update state after navigation
    }
  }

  return (
    <div className="relative flex items-center p-2 border-sky-500/70 bg-sky-500 cursor-pointer transition delay-10 duration-50 ease-in hover:scale-105 text-white">
      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>
      <select
        id="language-select"
        className="text-white"
        onChange={handleLanguageChange}
        disabled={!isClient} // Disable on server
        value={selectedLanguage}
      >
        {Object.entries(languages).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

