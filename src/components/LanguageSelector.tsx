import { useState } from "react";
import {
  getLangFromUrl,
  languages,
} from "@i18n/utils";
import { getRelativeLocaleUrl } from "astro:i18n";
import { navigate } from "astro:transitions/client";

export default function LanguageSelector() {
  const isClient = typeof window !== "undefined";
  const currentURL = isClient ? new URL(window.location.href) : null;
  const currentLanguage = currentURL ? getLangFromUrl(currentURL) : "en";
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLang = e.target.value;
    if (currentURL && newLang !== selectedLanguage) {
      let path = currentURL.pathname;

      // Remove base path if it exists
      if (import.meta.env.BASE_URL && path.startsWith(import.meta.env.BASE_URL)) {
        path = path.substring(import.meta.env.BASE_URL.length);
      }

      // Ensure path starts with a slash for consistent processing
      if (!path.startsWith('/')) {
        path = '/' + path;
      }

      // Remove current language prefix (using currentLanguage from URL)
      if (path.startsWith(`/${currentLanguage}/`)) {
        path = path.substring(`/${currentLanguage}/`.length);
      } else if (path === `/${currentLanguage}`) {
        path = '';
      }

      // Ensure path starts with a slash if not empty, or is just '/' for root
      if (path && !path.startsWith('/')) {
        path = '/' + path;
      } else if (!path) {
        path = '/';
      }

      

      const newPath = getRelativeLocaleUrl(
        newLang,
        path
      );
      navigate(newPath);
      setSelectedLanguage(newLang); // Update state after navigation
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

